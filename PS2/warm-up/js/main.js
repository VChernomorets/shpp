/**
 * Part1. Read the first two input. We check for validity.
 * We consider the sum of numbers in the interval.
 * Numbers end at 2, 3, 7. Print the result to the user.
 */
const countNumbersClick = document.getElementById("countNumbersClick");
countNumbersClick.addEventListener('click', () => {
    const firstNumber = document.getElementById('sumOfNumbers__firstNumber');
    const secondNumber = document.getElementById('sumOfNumbers__secondNumber');
    if (!isCorrectInput(firstNumber, secondNumber)) {
        return;
    }

    let result;
    if (firstNumber.value < secondNumber.value) {
        result = calculateSumNumbersInInterval(firstNumber.value, secondNumber.value);
    } else {
        result = calculateSumNumbersInInterval(secondNumber.value, firstNumber.value);
    }
    const resultBlock = document.getElementById('sumOfNumbers__result');
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
    const regex = RegExp('(2$)|(3$)|(7$)');
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
const isCorrectInput = (...args) => {
    let minValue = -100;
    let maxValue = 100;
    args.forEach((element) => {
        if (element.value > maxValue || element.value < minValue || !element.value) {
            element.classList.add("error");
            return false;
        } else {
            element.classList.remove("error");
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
const convertSeconds = document.getElementById("convertSeconds");
convertSeconds.addEventListener('click', () => {
    const secondsInput = document.getElementById('timeConversion__seconds');
    if (!checkRegex(RegExp('^\\d+$'), secondsInput.value)) {
        secondsInput.classList.add("error");
        return;
    }
    secondsInput.classList.remove("error");
    let seconds = secondsInput.value;
    let s = addZero(seconds % secondsInMinute);
    let m = addZero(Math.floor(seconds / secondsInMinute % minutesInHour));
    let h = addZero(Math.floor(seconds / (secondsInMinute * minutesInHour)));
    const result = document.getElementById('timeConversion__secondsResult');
    printResult(result, `${seconds} in format hh:mm:ss: ${h}:${m}:${s}`);
});
/**
 * With a temporary format translates into seconds.
 * Displays the result.
 */
const convertHour = document.getElementById('convertHour');
convertHour.addEventListener('click', () => {
    const time = document.getElementById('timeConversion__hour');
    if (!checkRegex(RegExp('^\\d?\\d:\\d?\\d:\\d?\\d$'), time.value)) {
        time.classList.add("error");
        return;
    } else {
        time.classList.remove("error");
    }
    let hms = time.value.split(':');
    let seconds = (parseInt(hms[0]) * (secondsInMinute * secondsInMinute) + (parseInt(hms[1]) * secondsInMinute) + parseInt(hms[2]));
    const result = document.getElementById('timeConversion__hourResult');
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
const calculateTimeInterval = document.getElementById('calculateTimeInterval');
calculateTimeInterval.addEventListener('click', () => {
    let firstDate = new Date(document.getElementById('firstDate').value);
    let secondDate = new Date(document.getElementById('secondDate').value);
    let arrayFirstDate;
    let arraySecondDate;
    if (firstDate.getTime() > secondDate.getTime()) {
        arrayFirstDate = createArrayDate(secondDate);
        arraySecondDate = createArrayDate(firstDate);
    } else {
        arrayFirstDate = createArrayDate(firstDate);
        arraySecondDate = createArrayDate(secondDate);
    }
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
    const resultMessage = `Результат: ${between[5]} year(s), ${between[4]} month(s), ${between[3]} day(s), ${between[2]} hour(s), ${between[1]} minute(s), ${between[0]} second(s)`;
    const result = document.getElementById('timeInterval__result');
    printResult(result, resultMessage);
});

/**
 * Remove all child elements.
 * @param parent Parent element.
 */
clearChild = (parent) => {
    parent.innerHTML = '';
};

/**
 * We draw a chessboard in the set parameters.
 */
const drawChessBoard = document.getElementById('drawChessBoard');
drawChessBoard.addEventListener('click', () => {
    const dimensionsInput = document.getElementById('cellNumber');
    let dimensions = dimensionsInput.value.split('x');
    const boardSize = 500;
    const chessBoardView = document.getElementById('chessBoardView');
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
let allLink = [];


/**
 * We process record similar to IP
 * @param text IP-like record
 */
processIp = (text) => {
    let values = text.split(".");
    let maxValueInIp = 255;
    let minValueInIp = 0;
    for (let i = 0; i < values.length; i++) {
        if (values[i] < minValueInIp || values[i] > maxValueInIp) {
            return;
        }
    }
    allLink.push(text);
};

/**
 * We process record similar to URL
 * @param text URL-like record
 */
processUrl = (text) => {
    allLink.push(text);
};

/**
 * Displays all posts similar to URLs.
 * @param result Block to display the result
 */
displayLink = (result) => {
    for (let i = 0; i < allLink.length; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = allLink[i];
        let text = allLink[i].replace("http://", "");
        text = text.replace("https://", "");
        a.innerText = text;
        a.target = "_blank";
        result.appendChild(li);
        li.appendChild(a);
    }
};


/**
 * If the record is similar to IP calls the method for processing records similar to IP.
 * If it looks like a URL. Invokes a method for processing entries similar to a URL.
 * Other records are skipped.
 * @param elements array of records
 */
filterItems = (elements) => {
    const regexIp = new RegExp('\\d+\\.\\d+\\.\\d+\\.\\d+');
    const regexUrl = new RegExp('(https:\/\/)?\\w+\\.\\w+');
    console.log(elements);
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
const urlAndIp = document.getElementById('urlAndIp');
urlAndIp.addEventListener('blur', (e) => {
    allLink = [];
    const text = e.target.value;
    const elements = text.split(',');
    filterItems(elements);
    const result = document.getElementById("urlAndIp__result");
    clearChild(result);
    allLink.sort();
    displayLink(result);
});

/**
 * Regular expression selects all matches.
 */
const highlightText = document.getElementById('highlightText');
highlightText.addEventListener('click', () => {
    const text = document.getElementById('highlight__message').value;
    const regexp = new RegExp(document.getElementById("highlight__regexp").value, "g");
    document.getElementById("highlight__result").innerHTML = text.replace(regexp, "<mark>$&</mark>");
});
