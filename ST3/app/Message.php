<?php


class Message
{
    private $config;

    public function __construct()
    {
        $this->config = include dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR . 'config.php';
    }

    public function deleteMessage($id){
        $messages = self::getMessages();
        foreach ($messages as $message){
            if($message->id == $id){
                unset($messages[$id]);
            }
        }
        print_r($messages);
        self::write($messages);
    }

    function createMessage($data){
        $messages = self::getMessages();
        array_push($messages, ['id' => $data['id'], 'text' => $data['text'], 'x' => $data['x'], 'y' => $data['y']]);
        self::write($messages);
    }

    // returns messages starting with id
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