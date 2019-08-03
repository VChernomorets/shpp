<?php
require_once 'Authorization.php';
include "config.php";
include('validation.php');



if($_POST['type'] ?? false == 'login' ){
    $result = include('login.php');
    echo $result;
    if($result == true){
        Authorization::createSession($_POST['username']);
    }
}