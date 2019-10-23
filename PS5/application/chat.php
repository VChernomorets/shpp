<?php
require_once 'Messages.php';
require_once 'Accounts.php';

// returns a message starting with id
function getMessages($startId = 0){
    $messages = [];
    $time = time()-60*60;
    foreach (Messages::getMessages($startId) as $item){
        if($item->date > $time){
            $item->date = date('h:i:s', $item->date);
            array_push($messages, $item);
        }
    }
    return $messages;
}

// creates a message.
function createMessage($message){
    //$date = date('h:i:s');
    $time = time();
    $user = Accounts::getAccountByHash($_SESSION['hash'])->username;
    Messages::createMessage($message, $user, $time);
}

// returns username by session
function getUsername(){
    return Accounts::getAccountByHash($_SESSION['hash'])->username;
}