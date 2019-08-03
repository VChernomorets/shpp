<?php
require_once "Accounts.php";

class Authorization
{

    static function check()
    {
        if (!isset($_SESSION['hash'])) {
            return false;
        }
        echo "{" . Accounts::existHash($_SESSION['hash']) . "}";
        if(Accounts::existHash($_SESSION['hash'])){
            return true;
        } else {
            return false;
        }
    }

    static function createSession($username)
    {
        $hash = self::generateCode();
        Accounts::setHash($username, $hash);
        $_SESSION['hash'] = $hash;
    }

    private static function generateCode($length = 8)
    {
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPRQSTUVWXYZ0123456789";
        $code = "";
        $clen = strlen($chars) - 1;
        while (strlen($code) < $length) {
            $code .= $chars[mt_rand(0, $clen)];
        }
        return $code;
    }
}