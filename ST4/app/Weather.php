<?php

/**
 * Class Weather
 * Returns weather by data type
 */
class Weather
{
    public $config;

    public function __construct()
    {
        $this->config = include dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'config.php';
        require 'DB.php';
    }

    // Returns weather by data type
    public function getWeather($type, $cityId = null, $city = null)
    {
        if ($type === 'json') {
            return $this->getDateJson();
        }
        if ($type === 'sql') {
            return $this->getDateSql($cityId);
        }
        if ($type == 'api') {
            return $this->getDateApi($city);
        }
        return false;
    }

    // returns weather from json file
    private function getDateJson()
    {
        if (!file_exists($this->config['dataFile'])) {
            return false;
        }
        $data = file_get_contents($this->config['dataFile']);
        $data = json_decode($data, true);

        $today = new DateTime('2017-02-17');
        $kelvin = 273.15;
        $result = [];
        foreach ($data['list'] as $element) {
            $date = new DateTime($element['dt_txt']);
            if ($today->format('n-j') === $date->format('n-j')) {
                array_push($result, [
                    'date' => $date->format('j/m'),
                    'time' => $date->format('H:i'),
                    'temp' => round($element['main']['temp'] - $kelvin),
                    'icon' => $this->getIconByJson($element['weather'][0]['description'])
                ]);
            }
        }
        return $result;
    }

    // Returns weather from MySql base, by city id
    private function getDateSql($cityId)
    {
        if(!is_numeric($cityId))
        {
            return 'error city id';
        }
        $db = new DB();
        $data = $db->select('SELECT `temperature`, `timestamp`, `clouds`, `rain_possibility` FROM `forecast` WHERE `city_id`=? ', [$cityId]);
        if(count($data) === 0){
            return 'city not found';
        }
        $result = [];
        foreach ($data as $element) {
            $date = new DateTime($element['timestamp']);
            array_push($result, [
                'date' => $date->format('j/m'),
                'time' => $date->format('H:i'),
                'temp' => $element['temperature'],
                'icon' => $this->getIconBySql($element['clouds'], $element['rain_possibility'])
            ]);
        }
        return $result;
    }

    // Returns the weather by city name. First we find the city id on the service.
    // Next, we find out the weather for 24 hours, and return it.
    private function getDateApi($city){
        if(!is_string($city)){
            return 'error city name';
        }
        $link = 'http://dataservice.accuweather.com/locations/v1/cities/UA/search?language=en-us&apikey=' . $this->config['apiKey'] . '&q=' . $city;
        $data = json_decode(file_get_contents($link));
        $cityKey = $data[0]->Key;
        $link = 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/' . $cityKey . '?language=en-us&details=true&apikey=' . $this->config['apiKey'];
        $data = json_decode(file_get_contents($link));
        $result = [];
        foreach($data as $element){
            $date = new DateTime($element->DateTime);
            array_push($result, [
                'date' => $date->format('j/m'),
                'time' => $date->format('H:i'),
                'temp' => round(($element->Temperature->Value - 32) / 1.8),
                'icon' => $this->getIconByApi($element->CloudCover, $element->Rain->Value)
            ]);
        }
        return $result;
    }

    // Return the weather
    private function getIconByJson($description){
        switch ($description){
            case 'moderate rain' :
                return 'flash';
            case 'light rain' :
                return 'rain';
            case 'few clouds' :
                return 'partlyCloudy';
            case 'broken clouds' :
                return 'cloud';
            default :
                return 'sun';
        }
    }

    // Based on the weather data, we return its state
    private function getIconBySql($cloud, $rain){
        if($rain > 0.8){
            return 'flash';
        }
        if($rain > 0.6){
            return 'rain';
        }
        if($cloud > 70){
            return 'cloud';
        }
        if($cloud > 40){
            return 'partlyCloudy';
        }
        return 'sun';
    }

    // Based on the weather data, we return its state
    private function getIconByApi($cloud, $rain){
        if($rain > 1){
            return 'flash';
        }
        if($rain > 0){
            return 'rain';
        }
        if($cloud > 70){
            return 'cloud';
        }
        if($cloud > 40){
            return 'partlyCloudy';
        }
        return 'sun';
    }
}