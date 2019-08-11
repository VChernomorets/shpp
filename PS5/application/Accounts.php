<?php
include "config.php";


// Class for working with user accounts.
class Accounts
{
    // Returns an account by hash
    static function getAccountByHash($hash){
        foreach (self::getAccounts() as $account){
            if($account->hash == $hash){
                return $account;
            }
        }
        return null;
    }

    // assigned to user hash
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

    // Checks if the user hash
    static function existHash($hash){
        foreach (self::getAccounts() as $item){
            if($item->hash == $hash){
                return true;
            }
        }
        return false;
    }

    // Searches for a user by username, if he is not, returns false if true.
    static function existAccount($username){
        if( self::getAccount($username) != null){
            return 1;
        } else {
            return 0;
        }
    }

    // Create an account
    static function createAccount($username, $password){
        $date = self::getAccounts();
        array_push($date, ['username' => $username, 'password' => $password, 'hash' => ""]);
        self::write($date);
    }

    // returns user password
    static function getPassword($username){
        $account = self::getAccount($username);
        return $account->password;
    }

    // returns user account
    static function getAccount($username){
        foreach (self::getAccounts() as $account){
            if($account->username == $username){
                return $account;
            }
        }
        return null;
    }

    // returns all accounts
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

    // writes accounts to a file
    static function write($date = null){
        $file = fopen(ACCOUNT_FILE, 'w');
        if($date != null){
            fwrite($file, json_encode($date));
        }
        fclose($file);
    }


    // generates hash code
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