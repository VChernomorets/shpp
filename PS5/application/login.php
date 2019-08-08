<?php
require_once 'Accounts.php';

function authorization($username, $password)
{
    if (Accounts::existAccount($username)) {
        return Accounts::getPassword($username) == $password;
    }
    Accounts::createAccount($username, $password);
    return true;
}

function createSession($username){
    return Accounts::setHash($username);
}

function checkSession ($hash){
    return Accounts::existHash($hash);
}