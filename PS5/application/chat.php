<?php
require_once 'Messages.php';
require_once 'Accounts.php';

// returns a message starting with id
function getMessages($startId = 0){
    return Messages::getMessages($startId);
}

// creates a message.
function createMessage($message){
    $date = date('h:i:s');
    $user = Accounts::getAccountByHash($_SESSION['hash'])->username;
    Messages::createMessage($message, $user, $date);
}

// returns username by session
function getUsername(){
    return Accounts::getAccountByHash($_SESSION['hash'])->username;
}