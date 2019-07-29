<?php

// Look for the sum of numbers from -1000 to 1000. We filter by regular expression
function countSumNumbers($pattern = "//")
{
    $result = 0;
    for ($i = -1000; $i <= 1000; $i++) {
        if (preg_match($pattern, $i)) {
            $result += $i;
        }
    }
    return $result;
}

/**
 * We collect information from the folder.
 * @return string Return the collected information.
 */
function getFileList()
{
    $fileDirectory = "files/";
    $files = scandir($fileDirectory);
    $result = '';
    for ($i = 0; $i < count($files); $i++) {
        if (strlen($files[$i]) <= 2) {
            continue;
        }
        $result .= '<ul> <li>';
        $result .= '<a href="' . $fileDirectory . $files[$i] . '" download>';
        if (preg_match("/(jpg|png|gif|ico)$/", $files[$i])) {
            $result .= '<img src="' . $fileDirectory . $files[$i] . '" alt="' . $files[$i] . '">';
        }
        $result .= '<span>' . $files[$i] . ' ( ' . getBitName(filesize($fileDirectory . $files[$i])) . ' )</span>';
        $result .= '</a></li></ul>';
    }
    return $result;
}

/**
 * Display the file size in normal form.
 * @param $size
 * @return string normal size
 */
function getBitName($size)
{
    $bitName = array("B", "KB", "MB", "GB", "TB", "PB");
    $step = 0;
    $KilobyteSize = 1024;
    while ($size >= $KilobyteSize) {
        $size /= $KilobyteSize;
        $step++;
    }
    return round($size, 2) . " " . $bitName[$step];
}

/**
 * We generate a chessboard according to the specified parameters
 * @param $x
 * @param $y
 * @return string a chessboard
 */
function getChessBoard($x, $y)
{
    if ($x > 12 || $y > 12 || $x < 1 || $y < 1 || $x == '' || $y == '') {
        return '<div class="error">Error!</div>';
    }
    $result = '<div class="chessBoard">';
    for ($row = 1, $numberColor = 1; $row <= $x; $row++) {
        $result .= '<div class="chessBoard__row">';
        for ($col = 1; $col <= $y; $col++) {
            if ($numberColor % 2 == 0) {
                $result .= '<div class="chessBoard__square-black"></div>';
            } else {
                $result .= '<div class="chessBoard__square-white"></div>';
            }
            $numberColor++;
        }
        $result .= '</div>';
        if ($x % 2 === 0) {
            $numberColor++;
        }
    }
    return $result . '</div>';
}

/**
 * Looking for the sum of the numbers of a given number
 * @param $value
 * @return int|string Error or sum of numbers
 */
function getSumEnteredNumber($value)
{
    if ($value == '') {
        return '<div class="error">Empty line!</div>';
    }
    $value = str_replace('-', '', $value);
    $numbers = str_split($value);
    $result = 0;
    foreach ($numbers as $number) {
        $result += $number;
    }
    return $result;
}

/**
 * We generate an array of random integers from 1 to 10, the length of the array is 100.
 * We remove the repeats from the array, sort, turn and multiply each element by two.
 * @return string Result of performance
 */
function getResultTask6()
{
    $arraySize = 100;
    $minValue = 1;
    $maxValue = 10;
    $numbers = [];
    for ($i = 0; $i < $arraySize; $i++) {
        $numbers[$i] = rand($minValue, $maxValue);
    }
    $numbers = array_unique($numbers);
    sort($numbers);
    $numbers = array_reverse($numbers);
    for ($i = 0; $i < count($numbers); $i++) {
        $numbers[$i] *= 2;
    }
    return implode(' | ', $numbers);
}

/**
 * We process the text. We consider spaces, lines and the number of characters.
 * @param $value
 * @return string The number of lines, spaces, characters.
 */
function getResultTask8($value)
{
    if ($value == '') {
        return '<div class="error">Empty line!</div>';
    }
    $sizeLine = strlen($value);
    $line = preg_replace("/\n/", '', $value);
    $numberLines = $sizeLine - strlen($line);
    $sizeLine = strlen($line);
    $line = preg_replace("/\s/", '', $line);
    $numberSpaces = $sizeLine - $numberLines - strlen($line);
    return "Count lines: " . ($numberLines + 1) . ". Count of spaces: " . $numberSpaces . ". Characters: " . iconv_strlen($line);
}
