<?php
session_start();
if (($_POST['type'] ?? false) == 'login') {
    $type = $_POST['type'];
    include('validation.php');
    $username = $_POST['username'] ?? "";
    $password = $_POST['password'] ?? "";
    $errors = validation($username, $password);
    if (count($errors['errors'])) {
        printMessage($type, $errors);
    }
    include('login.php');
    if (authorization($username, $password)) {
        if (createSession($_POST['username'])) {
            printMessage($type, 'successful');
        }
    } else {
        array_push($errors['errors'], 'wrongPasswordError');
        printMessage($type, $errors);
    }
}

if (($_POST['type'] ?? false) == 'check') {
    include 'login.php';
    $result = false;
    if (isset($_SESSION['hash'])) {
        $result = checkSession($_SESSION['hash']);
    }
    printMessage('check', $result);
}

if(($_POST['type'] ?? false) == 'send'){
    printMessage('send', $_POST);
}


function printMessage($type, $message)
{
    echo json_encode([$type => $message]);
    exit();
}