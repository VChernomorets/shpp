<?php
session_start();

// authorization form processing
if (($_POST['type'] ?? false) == 'login') {
    $type = $_POST['type'];
    include('validation.php');
    $username = $_POST['username'] ?? "";
    $password = $_POST['password'] ?? "";
    $errors = validationLogin($username, $password);
    if (count($errors['errors'])) {
        printMessage($type, $errors);
    }
    include('login.php');
    if (authorization($username, $password)) {
        if (createSession($_POST['username'])) {
            printMessage($type, 'successful');
        }
    } else {
        array_push($errors['errors'], 'wrongPasswordError');
        printMessage($type, $errors);
    }
}

// processing user authorization checks
if (($_POST['type'] ?? false) == 'check') {
    printMessage('check', sessionExist());
}

// Check if a session exists
function sessionExist(){
    include 'login.php';
    $result = false;
    if (isset($_SESSION['hash'])) {
        $result = checkSession($_SESSION['hash']);
    }
    return $result;
}

// processing sending a chat message
if(($_POST['type'] ?? false) == 'send'){
    if(!sessionExist()){
        printMessage('send', ['errors' => 'loginFailed']);
    }
    include 'validation.php';
    $message = $_POST['message'] ?? '';
    $errors = validationSend($message);
    if(count($errors['errors'])){
        printMessage('send', $errors);
    }
    include 'chat.php';
    createMessage($message);
    printMessage('send', $message);
}

// message request processing
if(($_POST['type'] ?? false) == 'getMessage'){
    if(!sessionExist()){
        printMessage('getMessage', ['errors' => 'loginFailed']);
    }
    include 'chat.php';
    $messages = getMessages($_POST['id'] + 1);
    printMessage('getMessage', $messages);
}

// returns username by session
if(($_POST['type'] ?? false) == 'getUserName'){
    include 'chat.php';
    printMessage('getUserName', ['username' => getUsername()]);
}
// query result output
function printMessage($type, $message)
{
    echo json_encode([$type => $message]);
    exit();
}