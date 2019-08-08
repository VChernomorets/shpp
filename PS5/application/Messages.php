<?php


class Messages
{
    static function createMessage($message, $username, $date){
        $messages = self::getMessages();
        array_push($messages, ['date' => $date, 'username' => $username, 'messages' => $message]);
        self::write($messages);
    }

    static function getMessages(){
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
}