<?php
require_once 'Messages.php';
require_once 'Accounts.php';

// Returns messages starting with id
function getMessages($startId = 0){
    return Messages::getMessages($startId);
}

// creates message.
function createMessage($message){
    $date = date('h:i:s');
    $user = Accounts::getAccountByHash($_SESSION['hash'])->username;
    Messages::createMessage($message, $user, $date);
}