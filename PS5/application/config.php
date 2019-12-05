<?php
$dataPath = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'application' . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR;
return [
    'ACCOUNT_FILE' => $dataPath . 'accounts.json',
    'MESSAGES_FILE' => $dataPath . 'messages.json'
];