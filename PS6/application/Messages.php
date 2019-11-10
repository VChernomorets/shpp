<?php

// class for processing messages
class Messages
{
    // create message from user
    static function createMessage($message, $username, $date){
        $db = new DB();
        $db->insert('INSERT INTO messages (id, date, username, messages) VALUES (:id, :date, :username, :messages)', [':id' => 'NULL', ':date' => $date, ':username' => $username, ':messages' => $message]);
    }

    // returns messages starting with id
    static function getMessages($startID){
        $db = new DB();
        $messages = $db->select('SELECT * FROM messages WHERE id >= ?', [$startID]);
        return count($messages) != 0 ? $messages : [];
    }

    // writes messages to a file.
    static function write($date = null){
        $config = require 'config.php';
        $file = fopen($config['MESSAGES_FILE'], 'w');
        if($date != null){
            fwrite($file, json_encode($date));
        }
        fclose($file);
    }
}