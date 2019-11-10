<?php
require_once 'Accounts.php';

// user authorization processing
function authorization($username, $password)
{
    if (Accounts::existAccount($username)) {
        return Accounts::getPassword($username) == $password;
    }
    Accounts::createAccount($username, $password);
    return true;
}

// creating a session for the user
function createSession($username){
    return Accounts::setHash($username);
}

// user session verification
function checkSession ($hash){
    return Accounts::existHash($hash);
}