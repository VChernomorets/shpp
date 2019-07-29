<?php
session_start();
include 'engine.php';

// Fires if the data was transferred by post
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['task'])) {
        switch ($_POST['task']) {
            case '1' :
                $_SESSION['task1']['result'] = countSumNumbers();
                break;
            case '2' :
                $_SESSION['task2']['result'] = countSumNumbers("(2|3|7)");
                break;
            case '3' :
                $_SESSION['task3']['result'] = getFileList();
                break;
            case '4' :
                $_SESSION['task4']['result'] = getChessBoard($_POST['boardValue1'], $_POST['boardValue2']);
                break;
            case '5' :
                $_SESSION['task5']['result'] = getSumEnteredNumber($_POST['value']);
                break;
            case '6' :
                $_SESSION['task6']['result'] = getResultTask6();
                break;
            case '7' :
                $_SESSION['task7']['result'] = 0;
                break;
            case '8' :
                $_SESSION['task8']['result'] = getResultTask8($_POST['value']);
        }
    }

    // File upload processing
    if (isset($_POST['loadFile'])) {
        switch ($_FILES['uploadFile']['error']) {
            case '0' :
                copy($_FILES['uploadFile']['tmp_name'], "files/" . basename($_FILES['uploadFile']['name']));
                break;
            case '4' :
                $_SESSION['task3']['error'] = "File not selected!";
                break;
            default :
                $_SESSION['task3']['error'] = "File loading error!";
        }
    }
}

// Redirect to home page
header("Location: index.php");
