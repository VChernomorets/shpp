<?php
$data_path = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'date' . DIRECTORY_SEPARATOR;
return [
    'ACCOUNT_FILE' => $data_path . 'accounts.json',
    'MESSAGES_FILE' => $data_path . 'messages.json',
    'database' => [
        'host' => 'localhost',
        'dbname' => 'easy_chat',
        'user' => 'root',
        'pass' => ''
    ]
];
