/**
 * Part1. Read the first two input. We check for validity.
 * We consider the sum of numbers in the interval.
 * Numbers end at 2, 3, 7. Print the result to the user.
 */
let countNumbersClick = document.getElementById("countNumbersClick");
countNumbersClick.addEventListener('click', () => {
    let firstNumber = document.getElementById('sumOfNumbers__firstNumber');
    let secondNumber = document.getElementById('sumOfNumbers__secondNumber');
    if (!isCorrectInput(firstNumber, secondNumber)) {
        return;
    }

    let result;
    if (firstNumber.value < secondNumber.value) {
        result = calculateSumNumbersInInterval(firstNumber.value, secondNumber.value);
    } else {
        result = calculateSumNumbersInInterval(secondNumber.value, firstNumber.value);
    }
    let resultBlock = document.getElementsByClassName('sumOfNumbers__result')[0];
    printResult(resultBlock, result);
});


/**
 * Counts the sum of the numbers in the interval with the value of the first parameter, the value of the second parameter.
 * @param lessValue Start of interval
 * @param moreValue End of interval
 * @returns {number} The sum of numbers in the interval that ends with 2, 3, 7.
 */
calculateSumNumbersInInterval = (lessValue, moreValue) => {
    let result = 0;
    let regex = RegExp('(2$)|(3$)|(7$)');
    for (; lessValue <= moreValue; lessValue++) {
        if (regex.test(lessValue)) {
            result += Number(lessValue);
        }
    }
    return result;
};

/**
 * Checks the resulting numbers for a range from -100 to 100, and for emptiness.
 * @param args An array of numbers to check.
 * @returns {boolean} If any of the numbers do not match - false;
 */
isCorrectInput = (...args) => {
    args.forEach((value) => {
        if (value.value > 100 || value.value < -100 || value.value === '') {
            value.classList.add("error");
            return false;
        } else {
            value.classList.remove("error");
        }
    });
    return true;
};

/**
 * Appends to string 0 if the string is less than 2 characters.
 * @param value Value whose size must be 2
 * @returns {string} Row size 2
 */
addZero = (value) => {
    if (String(value).length < 2) {
        value = "0" + value;
    }
    return value;
};


let secondsInMinute = 60;
let minutesInHour = 60;
/**
 * Seconds translates into a time format. Displays the result.
 */
convertSeconds = document.getElementById("convertSeconds");
convertSeconds.addEventListener('click', () => {
    let secondsInput = document.getElementById('timeConversion__seconds');
    if (!checkRegex(RegExp('^[0-9]+$'), secondsInput.value)) {
        secondsInput.classList.add("error");
        return;
    }
    secondsInput.classList.remove("error");
    let seconds = secondsInput.value;
    let s = (seconds % secondsInMinute);
    let m = Math.floor(seconds / secondsInMinute % minutesInHour);
    let h = Math.floor(seconds / secondsInMinute * minutesInHour );
    let result = document.getElementsByClassName('timeConversion__secondsResult')[0];
    s = addZero(s);
    m = addZero(m);
    h = addZero(h);
    printResult(result, `${seconds} in format hh:mm:ss: ${h}:${m}:${s}`);
});
/**
 * With a temporary format translates into seconds.
 * Displays the result.
 */
convertHour = document.getElementById('convertHour');
convertHour.addEventListener('click', () => {
    let time = document.getElementById('timeConversion__hour');
    if (!checkRegex(RegExp('^[0-9]?[0-9]:[0-9]?[0-9]:[0-9]?[0-9]$'), time.value)) {
        time.classList.add("error");
        return;
    } else {
        time.classList.remove("error");
    }
    let hms = time.value.split(':');
    let seconds = (parseInt(hms[0]) * 3600) + (parseInt(hms[1]) * 60) + parseInt(hms[2]);
    let result = document.getElementsByClassName('timeConversion__hourResult')[0];
    printResult(result, `${time.value} in seconds: ${seconds}`);
});
// Checks the regular expression.
checkRegex = (regex, value) => {
    return regex.test(value);
};

// We translate from class to array.
createArrayDate = (date) => {
    return [date.getSeconds(), date.getMinutes(), date.getHours(), date.getDate(), date.getMonth(), date.getFullYear()];
};

printResult = (result, message) => {
    result.style.display = 'block';
    result.innerText = message;
};

/**
 * We consider the interval between two dates.
 */
calculateTimeInterval = document.getElementById('calculateTimeInterval');
calculateTimeInterval.addEventListener('click', () => {
    let firstDate = new Date(document.getElementById('firstDate').value);
    let secondDate = new Date(document.getElementById('secondDate').value);
    let result = document.getElementsByClassName('timeInterval__result')[0];
    if (firstDate.getTime() > secondDate.getTime()) {
        printResult(result, "The first date can not be more than the second!");
        return;
    }
    let arrayFirstDate = createArrayDate(firstDate);
    let arraySecondDate = createArrayDate(secondDate);
    let between = new Array(arrayFirstDate.length).fill(0);
    // [second, minute, hour, day, month, year]
    let maxValueInDate = [60, 60, 23, 30, 11, 0];
    for (let i = 0; i < arrayFirstDate.length; i++) {
        between[i] += arraySecondDate[i] - arrayFirstDate[i];
        if (between[i] < 0) {
            between[i] += maxValueInDate[i];
            between[i + 1]--;
        }
    }
    let resultMessage = `Результат: ${between[5]} year(s), ${between[4]} month(s), ${between[3]} day(s), ${between[2]} hour(s), ${between[1]} minute(s), ${between[0]} second(s)`;
    printResult(result, resultMessage);
});

/**
 * Remove all child elements.
 * @param element Parent.
 */
clearChild = (element) => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
};

/**
 * We draw a chessboard in the set parameters.
 */
drawChessBoard = document.getElementById('drawChessBoard');
drawChessBoard.addEventListener('click', () => {
    let dimensionsInput = document.getElementById('cellNumber');
    let dimensions = dimensionsInput.value.split('x');
    const boardSize = 500;
    let chessBoardView = document.getElementsByClassName('chessBoardView')[0];
    clearChild(chessBoardView);
    let squareSize = (boardSize / Number(dimensions[0]));
    chessBoardView.style.width = boardSize + "px";
    chessBoardView.style.display = "block";
    chessBoardView.style.border = "1px solid black";
    chessBoardView.style.height = (squareSize * dimensions[1]) + "px";
    for (let i = 1, colorNumber = 1; i <= dimensions[1]; i++) {
        for (let j = 1; j <= dimensions[0]; j++) {
            let square = document.createElement("div");
            square.className = 'chessBoard__square';
            if (colorNumber % 2 === 0) {
                square.style.backgroundColor = "black";
            } else {
                square.style.backgroundColor = "white";
            }
            square.style.width = squareSize + "px";
            square.style.height = squareSize + "px";
            square.style.cssFloat = "left";
            chessBoardView.appendChild(square);
            colorNumber++;
        }
        if (dimensions[0] % 2 === 0) {
            colorNumber++;
        }
    }
});

//All normal URL addresses
let allUrl = [];
// All normal IP addresses
let allIp = [];

/**
 * We process record similar to IP
 * @param text IP-like record
 */
processIp = (text) => {
    let values = text.split(".");
    for (let i = 0; i < values.length; i++) {
        if (values[i] < 0 || values[i] > 255) {
            return;
        }
    }
    allIp.push(text);
};

/**
 * We process record similar to URL
 * @param text URL-like record
 */
processUrl = (text) => {
    let regexSpace = new RegExp('\\s');
    if (regexSpace.test(text)) {
        return;
    }
    allUrl.push(text);
};

/**
 * Displays all posts similar to URLs.
 * @param result Block to display the result
 */
displayUrl = (result) => {
    for (let i = 0; i < allUrl.length; i++) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = allUrl[i];
        let text = allUrl[i].replace("http://", "");
        text = text.replace("https://", "");
        a.innerText = text;
        a.target = "_blank";
        result.appendChild(li);
        li.appendChild(a);
    }
};

/**
 * Displays all entries similar to IP.
 * @param result Block to display the result
 */
displayIp = (result) => {
    for (let i = 0; i < allIp.length; i++) {
        let li = document.createElement('li');
        li.innerText = allIp[i];
        result.appendChild(li);
    }
};

/**
 * If the record is similar to IP calls the method for processing records similar to IP.
 * If it looks like a URL. Invokes a method for processing entries similar to a URL.
 * Other records are skipped.
 * @param elements array of records
 */
filterItems = (elements) => {
    let regexIp = new RegExp('^[0-9]+[.][0-9]+[.][0-9]+[.][0-9]+$');
    let regexUrl = new RegExp('^((http|https):\/\/)|([a-z]+[.])[a-z]+[.][a-z]+');
    for (let i = 0; i < elements.length; i++) {
        if (regexIp.test(elements[i])) {
            processIp(elements[i]);

        } else if (regexUrl.test(elements[i])) {
            processUrl(elements[i]);
        }
    }
};

/**
 * Checks the entry, splits it by commas. Sorts the fields, displays the result.
 */
let urlAndIp = document.getElementById('urlAndIp');
urlAndIp.addEventListener('blur', (e) => {
    allUrl = [];
    allIp = [];
    let text = e.target.value;
    let elements = text.split(',');
    filterItems(elements);
    let result = document.getElementsByClassName("urlAndIp__result")[0];
    clearChild(result);
    allIp.sort();
    allUrl.sort();
    displayIp(result);
    displayUrl(result);
});

/**
 * Regular expression selects all matches.
 */
highlightText = document.getElementById('highlightText');
highlightText.addEventListener('click', () => {
    let text = document.getElementById('highlight__message').value;
    let regexp = new RegExp(document.getElementById("highlight__regexp").value, "g");
    document.getElementsByClassName("highlight__result")[0].innerHTML = text.replace(regexp, "<mark>$&</mark>");
});
