<?php

class DB
{
    private $dbh;

    /**
     * Connect to the database
     */
    function __construct()
    {
        $config = require 'config.php';
        $this->dbh = new PDO('mysql:host='. $config['database']['host'] . ';dbname='. $config['database']['dbname'], $config['database']['user'], $config['database']['pass']);
    }

    /*
     * Make an add request
     */
    public function insert($sql, $options){
        $query = $this->dbh->prepare($sql);
        $query->execute($options);
    }

    /*
     * Making a query for data sampling
     */
    public function select($sql, $options){
        $query = $this->dbh->prepare($sql);
        $query->execute($options);
        return $query->fetchAll(PDO::FETCH_ASSOC);
    }

    /*
     * Making a data update request
     */
    public function update($sql, $options){
        $query = $this->dbh->prepare($sql);
        $query->execute($options);
    }

}