<?php
session_start();
if (isset($_SESSION['task7']['result'])) {
    $_SESSION['task7']['result']++;
} else {
    $_SESSION['task7']['result'] = 1;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PS4</title>
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css?family=Muli|PT+Serif&display=swap" rel="stylesheet">
</head>
<body>

<section class="task">
    <h2 class="task__name">Task 1</h2>
    <div class="task__body">
        <div class="task__condition">
            <p>Calculate the sum of numbers from -1000 to 1000</p>
        </div>
        <form action="handler.php" method="post">
            <input type="hidden" name="task" value="1">
            <input type="submit" value="Calculate">
        </form>
        <div class="task__result">
            Result:
            <output class="task__resultValue"><?= isset($_SESSION['task1']['result']) ? $_SESSION['task1']['result'] : '' ?></output>
        </div>
    </div>
</section>
<section class="task">
    <h2 class="task__name">Task 2</h2>
    <div class="task__body">
        <div class="task__condition">
            <p>Count the sum of numbers from -1000 to 1000, adding only numbers that end with 2.3, and 7</p>
        </div>
        <form action="handler.php" method="post">
            <input type="hidden" name="task" value="2">
            <input type="submit" value="Calculate">
        </form>
        <div class="task__result">
            Result:
            <output class="task__resultValue"><?= isset($_SESSION['task2']['result']) ? $_SESSION['task2']['result'] : '' ?></output>
        </div>
    </div>
</section>

<section class="task">
    <h2 class="task__name">Task 3</h2>
    <div class="task__body">
        <div class="task__condition">
            <p>Make the download files in a separate folder.
                All files from the folder should be displayed in a list containing only
                the name and size of the file in a human-readable size (1kB, 3MB, 1.5GB) in brackets.
                Files can be downloaded. For image files, make a small preview.</p>
        </div>
        <div class="task__result">
            <div class="task__upload">
                <form class="task__uploadForm" action="handler.php" method="post" enctype="multipart/form-data">
                    <input type="file" name="uploadFile">
                    <input type="submit" name="loadFile" value="Load">
                </form>
                <span class="error">
                    <?php
                    echo isset($_SESSION['task3']['error']) ? $_SESSION['task3']['error'] : '';
                    $_SESSION['task3']['error'] = '';
                    ?>
                </span>
            </div>
            <div class="task__resultLinks">
                <h3>List of downloaded files</h3>
                <?= isset($_SESSION['task3']['result']) ? $_SESSION['task3']['result'] : '' ?>
                <form action="handler.php" method="post">
                    <input type="hidden" name="task" value="3">
                    <input type="submit" name="RefreshFileList" value="Refresh">
                </form>
            </div>
        </div>
    </div>
</section>
<section class="task">
    <h2 class="task__name">Task 4</h2>
    <div class="task__body">
        <div class="task__condition">
            <p>Chess board</p>
        </div>
        <div class="task__result">
            <form action="handler.php" method="post">
                <label for="boardValue1">Enter the size of the chessboard (max 12x12):</label><br>
                <input id="boardValue1" name="boardValue1" type="text" required>
                <label for="boardValue2">x</label>
                <input id="boardValue2" name="boardValue2" type="text" required>
                <input type="hidden" name="task" value="4">
                <input type="submit" name="chessBoard" value="Draw">
            </form>
            <?= isset($_SESSION['task4']['result']) ? $_SESSION['task4']['result'] : '' ?>
        </div>
    </div>
</section>
<section class="task">
    <h2 class="task__name">Task 5</h2>
    <div class="task__body">
        <div class="task__condition">
            <p>Find the sum digit of the entered number.</p>
        </div>
        <form action="handler.php" method="post">
            <label for="value">Insert the number:</label><br>
            <input id="value" name="value" type="number" required>
            <input type="hidden" name="task" value="5">
            <input type="submit" name="chessBoard" value="Draw">
        </form>
        <div class="task__result">
            Result:
            <output class="task__resultValue"><?= isset($_SESSION['task5']['result']) ? $_SESSION['task5']['result'] : '' ?></output>
        </div>
    </div>
</section>
<section class="task">
    <h2 class="task__name">Task 6</h2>
    <div class="task__body">
        <div class="task__condition">
            <p>Generate an array of random integers from 1 to 10, the length of the array is 100. Remove duplicates from
                the array, sort, revert and multiply each element by two.</p>
        </div>
        <form action="handler.php" method="post">
            <input type="hidden" name="task" value="6">
            <input type="submit" value="Calculate">
        </form>
        <div class="task__result">
            Result:
            <output class="task__resultValue"><?= isset($_SESSION['task6']['result']) ? $_SESSION['task6']['result'] : '' ?></output>
        </div>
    </div>
</section>
<section class="task">
    <h2 class="task__name">Task 7</h2>
    <div class="task__body">
        <div class="task__condition">
            <p>The page should have a counter for counting page visits through php sessions.</p>
        </div>
        <form method="post" action="handler.php">
            <input type="hidden" name="task" value="7">
            <input type="submit" value="Reset">
        </form>
        <div class="task__result">
            Result:
            <output class="task__resultValue"><?= $_SESSION['task7']['result'] ?></output>
        </div>
    </div>
</section>
<section class="task">
    <h2 class="task__name">Task 8</h2>
    <div class="task__body">
        <div class="task__condition">
            <p>Count the number of lines, letters and spaces in the entered text. Consider Cyrillic, emoji and special
                characters. Check with any online counter</p>
        </div>
        <form action="handler.php" method="post">
            <label for="value">Enter text:</label><br>
            <textarea id="value" name="value"></textarea>
            <input type="hidden" name="task" value="8">
            <input type="submit" value="Calculate">
        </form>
        <div class="task__result">
            Result:
            <output class="task__resultValue"><?= isset($_SESSION['task8']['result']) ? $_SESSION['task8']['result'] : '' ?></output>
        </div>
    </div>
</section>
</body>
</html>