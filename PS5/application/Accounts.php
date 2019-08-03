<?php
include "config.php";

class Accounts
{

    static function setHash($username, $hash){
        foreach (self::getAccounts() as $item){
            if($item->username == $username){
                $item->hash = $hash;
            }
        }
    }

    static function existHash($hash){
        foreach (self::getAccounts() as $item){
            if($item->hash == $hash){
                echo "YEs!";
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
        if(filesize(ACCOUNT_FILE) != 0) {
            $file = fopen(ACCOUNT_FILE, 'r');
            $date = json_decode(fread($file, filesize(ACCOUNT_FILE)));
            fclose($file);
            return $date;
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
}