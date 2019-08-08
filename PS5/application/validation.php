<?php

function validationLogin($username, $password){
    $errors = array();
    if(!preg_match('/^.{3,}$/', $username)){
        array_push($errors, 'usernameError');
    }
    if(!preg_match('/^.{8,}$/', $password)){
        array_push($errors, 'passwordError');
    }
    return ['errors' => $errors];
}

function validationSend($message){
    $errors = [];
    if($message == ""){
        array_push($errors, 'emptyMessage');
    }
    return ['errors' => $errors];
}