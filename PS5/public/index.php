<?php

session_start();
require_once "../application/Authorization.php";

echo Authorization::check();
if(!Authorization::check()){
    header("Location: login.php");
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Easy Chat</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans|Pacifico&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<header>
    <div class="line"></div>
    <div class="line"></div>
</header>
<?php
include('../application/views/chat.php');
?>
<script type="text/javascript" src="js/main.js"></script>
</body>
</html>