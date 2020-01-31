<?php

class DB
{
    private $dbh;

    /**
     * Connect to the database
     */
    function __construct()
    {
        $config = include dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'config.php';
        $this->dbh = new PDO('mysql:host='. $config['db']['host'] . ';dbname='. $config['db']['dbname'], $config['db']['user'], $config['db']['pass']);
    }

    /*
     * Making a query for data sampling
     */
    public function select($sql, $options){
        $query = $this->dbh->prepare($sql);
        $query->execute($options);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

}