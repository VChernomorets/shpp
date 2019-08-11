<?php
require_once 'Accounts.php';

// Handles authorization
function authorization($username, $password)
{
    if (Accounts::existAccount($username)) {
        return Accounts::getPassword($username) == $password;
    }
    Accounts::createAccount($username, $password);
    return true;
}

// creates a session for the user
function createSession($username){
    return Accounts::setHash($username);
}

// checks the session for existence.
function checkSession ($hash){
    return Accounts::existHash($hash);
}