<?php


/**
 * Class City
 * Returns a list of cities depending on the type of database
 */
class City
{
    public $config;

    public function __construct()
    {
        $this->config = include dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'config.php';
        require 'DB.php';
    }

    // Returns a list of cities depending on the type of database
    public function getCity($type){
        switch ($type){
            case 'sql':
                return $this->getSql();
            case 'api' :
                return $this->getApi();
        }
        return null;
    }

    // returns a list of cities from the MySql base
    private function getSql(){
        $db = new DB();
        return $db->select('SELECT `id`, `name` FROM `cities`', []);
    }

    // returns a list of cities by api
    private function getApi(){
        $link = 'http://dataservice.accuweather.com/locations/v1/adminareas/UA?language=en-us&apikey=' . $this->config['apiKey'] ;
        $data = json_decode(file_get_contents($link));
        $result = [];
        /*print_r($data);
        exit();*/
        foreach ($data as $element){
            array_push($result, [
                'id' => $element->ID,
                'name' => $element->LocalizedName
            ]);
        }
        return $result;
    }

}