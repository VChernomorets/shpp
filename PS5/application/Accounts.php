<?php
include "config.php";

class Accounts
{
    static function setHash($username){
        $hash = self::generateCode();
        $accounts = self::getAccounts();
        foreach ($accounts as $item){
            if($item->username == $username){
                $item->hash = $hash;
                $_SESSION['hash'] = $hash;
                self::write($accounts);
                return true;
            }
        }
        return false;
    }

    static function existHash($hash){
        foreach (self::getAccounts() as $item){
            if($item->hash == $hash){
                return true;
            }
        }
        return false;
    }

    static function existAccount($username){
        if( self::getAccount($username) != null){
            return 1;
        } else {
            return 0;
        }
    }

    static function createAccount($username, $password){
        $date = self::getAccounts();
        array_push($date, ['username' => $username, 'password' => $password, 'hash' => ""]);
        self::write($date);
    }

    static function getPassword($username){
        $account = self::getAccount($username);
        return $account->password;
    }

    static function getAccount($username){
        foreach (self::getAccounts() as $account){
            if($account->username == $username){
                return $account;
            }
        }
        return null;
    }

    static function getAccounts(){
        if(!file_exists(ACCOUNT_FILE)){
            self::write();
            return [];
        }
        if($test = file_get_contents(ACCOUNT_FILE)){
            return json_decode($test);
        }
        return [];
    }

    static function write($date = null){
        $file = fopen(ACCOUNT_FILE, 'w');
        if($date != null){
            fwrite($file, json_encode($date));
        }
        fclose($file);
    }

    private static function generateCode($length = 12)
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