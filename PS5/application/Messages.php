<?php

// class for processing messages
class Messages
{
    // create message from user
    static function createMessage($message, $username, $date){
        $messages = self::getMessages(0);
        array_push($messages, ['id' => count($messages), 'date' => $date, 'username' => $username, 'messages' => $message]);
        self::write($messages);
    }

    // returns messages starting with id
    static function getMessages($startID){
        $config =  include "config.php";
        if(!file_exists($config['MESSAGES_FILE'])){
            self::write();
            return [];
        }
        if($test = file_get_contents($config['MESSAGES_FILE'])){
            $date = json_decode($test);
            $newDate = [];
            foreach ($date as $item){
                $date = date('h:i:s');
                if($item->id >= $startID){
                    array_push($newDate, $item);
                }
            }
            return $newDate;
        }
        return [];
    }

    // writes messages to a file.
    static function write($date = null){
        $config =  include "config.php";
        $file = fopen($config['MESSAGES_FILE'], 'w');
        if($date != null){
            fwrite($file, json_encode($date));
        }
        fclose($file);
    }
}