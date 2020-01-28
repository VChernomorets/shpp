<?php
$app = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR;
require $app.'Message.php';
if(($_POST['type'] ?? '') === 'saveMessage'){
    $data = [
    'id' => $_POST['id'] ?? '',
    'text' => $_POST['text'] ?? '',
    'x' => $_POST['x'] ?? '',
    'y' => $_POST['y'] ?? '' ];
    if(!checkInput($data)){
        exit('error');
    }
    $message = new Message();
    $message->createMessage($data);
    echo 'зашли';
}

if(($_POST['type'] ?? '') === 'deleteMessage'){
    $id = $_POST['id'] ?? '';
    if($id === ''){
        return 'error delete message';
    }
    $message = new Message();
    $message ->deleteMessage($id);
}

function checkInput($data){
    foreach ($data as $item){
        if($item === ''){
            return false;
        }
    }
    return true;
}