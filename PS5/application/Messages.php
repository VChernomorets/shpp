<?php


/**
 * Using this class, you can write messages to a file and also read them.
 */
class Messages
{
    // Creates a message and writes to a file.
    static function createMessage($message, $username, $date){
        $messages = self::getMessages(0);
        array_push($messages, ['id' => count($messages), 'date' => $date, 'username' => $username, 'messages' => $message]);
        self::write($messages);
    }

    // Returns messages starting with a specific id.
    static function getMessages($startID){
        if(!file_exists(MESSAGES_FILE)){
            self::write();
            return [];
        }
        if($test = file_get_contents(MESSAGES_FILE)){
            $date = json_decode($test);
            $newDate = [];
            foreach ($date as $item){
                if($item->id >= $startID){
                    array_push($newDate, $item);
                }
            }
            return $newDate;
        }
        return [];
    }


    // Writes messages to a file
    static function write($date = null){
        $file = fopen(MESSAGES_FILE, 'w');
        if($date != null){
            fwrite($file, json_encode($date));
        }
        fclose($file);
    }
}