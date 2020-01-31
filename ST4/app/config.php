<?php
$dataPath = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR;
return [
    'dataFile' => $dataPath . 'today.json',
    'db' => [
        'host' => 'localhost',
        'dbname' => 'weather',
        'user' => 'root',
        'pass' => ''
    ],
    'apiKey' => ''
];