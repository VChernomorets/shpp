<?php
session_start();
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.css">
    <title>PS4 - Voting</title>
</head>
<body>
<section>
    <div class="voting">
        <div class="voting__items">
            <img class="voting__item" src="images/kot_1.jpg" alt="1">
            <img class="voting__item" src="images/kot_2.jpg" alt="2">
        </div>
        <form class="voting__options" action="handler.php" method="post">
            <input class="voting__option" type="submit" name="voting__item" value="1">
            <input class="voting__option" type="submit" name="voting__item" value="2">
        </form>
        <?= isset($_SESSION['voting']['message']) ? $_SESSION['voting']['message'] : '' ?>
        <?= isset($_SESSION['voting']['error']) ? $_SESSION['voting']['error'] : '' ?>
        <div class="voting__viewResults">
            <a href="result.php">View results</a>
        </div>
    </div>
</section>

</body>
</html>