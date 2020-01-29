<?php

/**
 * Class Message
 *  using this class you can add, delete, and edit messages
 */
class Message
{
    private $config;

    public function __construct()
    {
        $this->config = include dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'config.php';
    }

    // deletes the message by its id
    public function deleteMessage($id){
        $messages = self::getMessages();
        $new = [];
        foreach ($messages as $message){
            if($message->id !== $id){
                array_push($new, $message);
            }
        }
        self::write($new);
    }

    // Writes message data to a file
    function createMessage($data){
        $messages = self::getMessages();
        $message = $this->getMessage($data['id']);
        if($message !== false){
            self::deleteMessage($data['id']);
            $messages = self::getMessages();
        }
        array_push($messages, ['id' => $data['id'], 'text' => $data['text'], 'x' => $data['x'], 'y' => $data['y']]);
        self::write($messages);
    }

    // Returns the message by its id, if there is no message with such id, returns the false
    function getMessage($id){
        $messages = self::getMessages();
        foreach ($messages as $message){
            if($message->id === $id){
                return $message;
            }
        }
        return false;
    }

    // Returns all messages
    function getMessages(){
        if(!file_exists($this->config['MESSAGES_FILE'])){
            self::write();
            return [];
        }
        if($test = file_get_contents($this->config['MESSAGES_FILE'])){
            return json_decode($test);
        }
        return [];
    }

    // writes messages to a file.
    private function write($date = null){
        $file = fopen($this->config['MESSAGES_FILE'], 'w');
        if($date != null){
            fwrite($file, json_encode($date));
        }
        fclose($file);
    }
}