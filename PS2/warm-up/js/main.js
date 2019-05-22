/**
 * Part1. Read the first two input. We check for validity.
 * We consider the sum of numbers in the interval.
 * Numbers end at 2, 3, 7. Print the result to the user.
 */
function countNumbers() {
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

    document.getElementsByClassName('sumOfNumbers__result')[0].style.display = 'block';
    document.getElementsByClassName('sumOfNumbers__resultNumber')[0].innerHTML = result;
}


/**
 * Counts the sum of the numbers in the interval with the value of the first parameter, the value of the second parameter.
 * @param lessValue Start of interval
 * @param moreValue End of interval
 * @returns {number} The sum of numbers in the interval that ends with 2, 3, 7.
 */
function calculateSumNumbersInInterval(lessValue, moreValue) {
    let result = 0;
    let regex = RegExp('(2$)|(3$)|(7$)');
    for (; lessValue <= moreValue; lessValue++) {
        if (regex.test(lessValue)) {
            result += Number(lessValue);
        }
    }
    return result;
}

/**
 * Checks the resulting numbers for a range from -100 to 100, and for emptiness.
 * @param args An array of numbers to check.
 * @returns {boolean} If any of the numbers do not match - false;
 */
function isCorrectInput(...args) {
    let error = true;
    args.forEach( (value) => {
        if (value.value > 100 || value.value < -100 || value.value === '') {
            value.style.border = '2px solid red';
            error = false;
        } else {
            value.style.border = '';
        }
    });
    return error;
}

/**
 * Seconds translates into a time format. Displays the result.
 */
convertSeconds = () => {
    let secondsInput = document.getElementById('timeConversion__seconds');
    if (!checkRegex(RegExp('^[0-9]+$'), secondsInput.value)) {
        secondsInput.style.border = "2px solid red";
        return;
    } else {
        secondsInput.style.border = "";
    }
    let seconds = secondsInput.value;
    let s = (seconds % 60);
    let m = Math.floor(seconds / 60 % 60);
    let h = Math.floor(seconds / 3600);
    let result = document.getElementsByClassName('timeConversion__secondsResult')[0];
    result.style.display = 'block';
    result.innerHTML = `Результат: ${h}:${m}:${s}`;
};
/**
 * With a temporary format translates into seconds.
 * Displays the result.
 */
convertHour = () => {
    let time = document.getElementById('timeConversion__hour');
    if (!checkRegex(RegExp('^[0-9]?[0-9]:[0-9]?[0-9]:[0-9]?[0-9]$'), time.value)) {
        time.style.border = "2px solid red";
        return;
    } else {
        time.style.border = "";
    }
    let hms = time.value.split(':');
    let seconds = (parseInt(hms[0]) * 3600) + (parseInt(hms[1]) * 60) + parseInt(hms[2]);
    let result = document.getElementsByClassName('timeConversion__hourResult')[0];
    result.style.display = 'block';
    result.innerHTML = `Результат: ${seconds}`;
};
// Checks the regular expression.
checkRegex = (regex, value) => {
    return regex.test(value);
};
// We translate from class to array.
function createArrayDate(date) {
    return [date.getSeconds(), date.getMinutes(), date.getHours(), date.getDate(), date.getMonth(), date.getFullYear()];
}

/**
 * We consider the interval between two dates.
 */
calculateTimeInterval = () => {
    let firstDate = new Date(document.getElementById('firstDate').value);
    let secondDate = new Date(document.getElementById('secondDate').value);
    if(firstDate.getTime() > secondDate.getTime()){
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
    let result = document.getElementsByClassName('timeInterval__result')[0];
    result.style.display = 'block';
    result.innerHTML = `Результат: ${between[5]} year(s), ${between[4]} month(s), ${between[3]} day(s), ${between[2]} hour(s), ${between[1]} minute(s), ${between[0]} second(s)`;
};

/**
 * Remove all child elements.
 * @param element Parent.
 */
function clearChild(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/**
 * We draw a chessboard in the set parameters.
 */
drawChessBoard = () => {
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
    for (let i = 1, colorNumber = 1; i <= dimensions[0] * dimensions[1]; i++, colorNumber++) {
        let square = document.createElement("div");
        square.className = 'chessBoard__square';
        if (colorNumber % 2 === 0) {
            square.style.backgroundColor = "black";
        } else {
            square.style.backgroundColor = "white";
        }
        if (i % dimensions[0] === 0) {
            colorNumber--;
        }
        square.style.color = "red";
        square.style.width = squareSize + "px";
        square.style.height = squareSize + "px";
        square.style.cssFloat = "left";
        chessBoardView.appendChild(square);
    }
};

//All normal URL addresses
let allUrl = [];
// All normal IP addresses
let allIp = [];

/**
 * We process record similar to IP
 * @param text IP-like record
 */
function processIp(text) {
    let values = text.split(".");
    for (let i = 0; i < values.length; i++) {
        if (values[i] < 0 || values[i] > 255) {
            return;
        }
    }
    allIp.push(text);
}
/**
 * We process record similar to URL
 * @param text URL-like record
 */
function processUrl(text) {
    let regexSpace = new RegExp('\\s');
    if (regexSpace.test(text)) {
        return;
    }
    allUrl.push(text);
}

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
        console.log(li);
        console.log(a);
        result.appendChild(li);
        li.appendChild(a);
    }
};

/**
 * Displays all entries similar to IP.
 * @param result Block to display the result
 */
function displayIp(result) {
    for (let i = 0; i < allIp.length; i++) {
        let li = document.createElement('li');
        li.innerText = allIp[i];
        result.appendChild(li);
    }
}

/**
 * If the record is similar to IP calls the method for processing records similar to IP.
 * If it looks like a URL. Invokes a method for processing entries similar to a URL.
 * Other records are skipped.
 * @param elements array of records
 */
filterItems = (elements) => {
    let regexIp = new RegExp('^[0-9]+[.][0-9]+[.][0-9]+[.][0-9]+$');
    let regexUrl = new RegExp('^(http|https):\/\/[a-z]+[.][a-z]+');
    for (let i = 0; i < elements.length; i++) {
        if (regexIp.test(elements[i])) {
            processIp(elements[i]);

        } else if (regexUrl.test(elements[i])) {
            processUrl(elements[i]);
        }
    }
};
// field to enter the URL and IP.
let urlAndIp = document.getElementById('urlAndIp');
/**
 * Checks the entry, splits it by commas. Sorts the fields, displays the result.
 */
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
highlightText = () => {
    let text = document.getElementById('highlight__message').value;
    let regexp = new RegExp(document.getElementById("highlight__regexp").value, "g");
    document.getElementsByClassName("highlight__result")[0].innerHTML = text.replace(regexp, "<mark>$&</mark>");
};
