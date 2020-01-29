<?php
$app = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'app' . DIRECTORY_SEPARATOR;
require $app.'Message.php';

// Processing the request to save the message.
//If everything is correct, record a message
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
    return;
}

// Delete the message by its id
if(($_POST['type'] ?? '') === 'deleteMessage'){
    $id = $_POST['id'] ?? '';
    if($id === '' || !is_numeric($id)){
        return 'error delete message';
    }
    $message = new Message();
    $message ->deleteMessage($id);
    return;
}

// We return all messages
if(($_POST['type'] ?? '') === 'getMessages'){
    $message = new Message();
    echo json_encode(['getMessages' => $message->getMessages()]);
}

// Check parameters for emptiness. If empty, false if all filled true
function checkInput($data){
    foreach ($data as $item){
        if($item === ''){
            return false;
        }
    }
    return true;
}