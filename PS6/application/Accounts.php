<?php
include './DB.php';

// Class for working with user accounts.
class Accounts
{
    // Returns an account by hash
    static function getAccountByHash($hash){
        $db = new DB();
        $account = $db->select('SELECT * FROM users WHERE hash = ?', [$hash]);
        return count($account) != 0 ? $account[0] : null;
    }

    // assigned to user hash
    static function setHash($username){
        $hash = self::generateCode();
        $db = new DB();
        $account = $db->select('SELECT * FROM users WHERE username = ?', [$username]);
        if(count($account) == 0){
            return false;
        }
        $db->update('UPDATE users SET hash = ? WHERE username = ?', [$hash, $username]);
        $_SESSION['hash'] = $hash;
        return true;
    }

    // Checks if the user hash
    static function existHash($hash){
        $db = new DB();
        $account = $db->select('SELECT * FROM users WHERE hash = ?', [$hash]);
        return count($account) != 0 ? true : false;
    }

    // Searches for a user by username, if he is not, returns false if true.
    static function existAccount($username){
        $db = new DB();
        $account = $db->select('SELECT * FROM users WHERE username = ?', [$username]);
        return count($account) != 0 ? true : false;
    }

    // Create an account
    static function createAccount($username, $password){
        $db = new DB();
        $db->insert('INSERT INTO users (id, username, pass, hash) VALUES (:id, :username, :pass, :hash)', [':id' => NULL, ':username' => $username, ':pass' => md5($password), ':hash' => '']);
    }

    // returns user password
    static function getPassword($username){
        $db = new DB();
        return $db->select('SELECT pass FROM `users` WHERE username = ?', [$username])[0]['pass'];
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