<?php
session_start();

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    if(!isset($_POST['voting__item'])){
        return;
    }
    if(preg_match( '/^(1|2)$/', $_POST['voting__item']) & !isset($_COOKIE['voted'])){
        setcookie("voted",'hi',time() + (3600*24));
        writeResultToFile($_POST['voting__item']);
        $_SESSION['voting']['message'] = '<div class="message">Thank you for participating in the voting.</div>';
        unset($_SESSION['voting']['error']);
    } else {
        unset($_SESSION['voting']['message']);
        $_SESSION['voting']['error'] = '<div class="error">You can vote once a day!</div>';
    }
}

function writeResultToFile($result){
    $fileName = "date.json";
    if(file_exists($fileName)){
        $date = json_decode(file_get_contents($fileName));
        $date->{'voting'}->{'Option'.$result}++;
        writeToFile($date, $fileName);
    } else {
        $optin = array(1 => 0, 2 => 0);
        $optin[$result]++;
        $date = array('voting' => array('Option1' => $optin[1], 'Option2' => $optin[2]));
        writeToFile($date, $fileName);
    }
}

function writeToFile($date, $pathToFile){
    $file = fopen($pathToFile, 'w');
    fwrite($file, json_encode($date));
    fclose($file);
}

header("Location: index.php");