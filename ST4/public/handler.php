<?php
$app = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR;
require $app . 'Weather.php';
require $app . 'City.php';

// We return the weather from a specific database.
if (($_POST['type'] ?? '') === 'getWeather') {
    $weather = new Weather();
    echo json_encode(['weather' => $weather->getWeather($_POST['typeDate'], ($_POST['cityId']) ?? '', ($_POST['city']) ?? '')]);
    return;
}

// We return the list of cities with a specific database
if (($_POST['type'] ?? '') === 'getCity') {
    $city = new City();
    echo json_encode(['getCity' => $city->getCity($_POST['typeDate'])]);
    return;
}