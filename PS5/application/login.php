<?php
require_once 'Accounts.php';
$result = false;
$username = $_POST['username'];
$password = $_POST['password'];
if(Accounts::existAccount($username)){
    return Accounts::getPassword($username) == $password ? true : 'Пароль неверный!';
}
Accounts::createAccount($username, $password);
return true;