$('#json').on('click', generateQuery);
$('#sql').on('click', generateQuery);
$('#api').on('click', generateQuery);

// remember the selected type of data loading
let $selected = $("#json");

// Making a start weather request to the server
query('type=getWeather&typeDate=' + $selected.attr('id'));

// We generate a request to the server, depending on the selected data type.
// If the type is json, we immediately request the weather.
// If the type is different, we request a list of cities.
function generateQuery(e) {
    e.preventDefault();
    const id = $(this).attr('id');
    if ($selected.attr('id') === id) {
        return;
    }
    $selected.removeClass('active');
    $(this).addClass('active');
    $selected = $(this);
    if (id === 'json') {
        $('#city').css('display', 'none');
        query('type=getWeather&typeDate=' + id);
    } else {
        query('type=getCity&typeDate=' + id);
    }

}

// Making a server request
function query(data) {
    $('#preloader').show();
    $.ajax({
        type: 'post',
        url: 'handler.php',
        data: data,
        dataType: 'json',
        success: function (answer) {
            handler(answer);
        },
        error: function (answer) {
            console.log("error");
            console.log(answer['responseText'])
        }
    });
}

// We process the response from the server
function handler(answer) {

    // Processing weather
    if (isset(answer['weather'])) {
        const weather = answer['weather'];
        $('#weatherNow').text(weather[0]['temp']);
        $('#date').text(weather[0]['date']);
        $('#forecast').html('');
        weather.forEach((element) => {
            createWeatherLine(element);
        });
        $('#preloader').slideUp('slow');
        return;
    }

    // Processing the list of cities
    if (isset(answer['getCity'])) {
        const list = answer['getCity'];
        const $select = $('#city__select');
        $select.html('');
        list.forEach((element) => {
            const $option = $('<option></option>').attr('value', element['id']).text(element['name']).addClass('city__option');
            $select.append($option);
        });
        $select.parent().css('display', 'block');
        $select.on('change', changeSelect);
        query('type=getWeather&typeDate=' + $selected.attr('id')+ '&cityId=' + list[0]['id'] + '&city=' + list[0]['name']);
    }

}

//When changing the city, we make a weather request by the name of the city
function changeSelect() {
    query('type=getWeather&typeDate=' + $selected.attr('id')+ '&cityId=' + $(this).val() + '&city=' + $(this).find('option:selected').text());
}

// Display the weather for the user
function createWeatherLine(element) {
    const $line = $('<div></div>').addClass('hourly-forecast clearfix');
    const $time = $('<div></div>').addClass('forecast-date').text(element['time']);
    const $weather = $('<div></div>').addClass('forecast-weather');
    const $temp = $('<div></div>').addClass('forecast-temperature').text(element['temp'] + ' °');
    //const $tempIcon = $('<div class="forecast-icon"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 34.85 34.85" style="enable-background:new 0 0 34.85 34.85;" xml:space="preserve" fill="#fff"> <g> <path d="M17.424,26.788c-5.163,0-9.363-4.2-9.363-9.363c0-5.164,4.2-9.364,9.363-9.364s9.363,4.201,9.363,9.364 C26.788,22.588,22.587,26.788,17.424,26.788z M17.424,9.061c-4.611,0-8.363,3.752-8.363,8.364c0,4.611,3.752,8.363,8.363,8.363 s8.363-3.752,8.363-8.363C25.788,12.813,22.036,9.061,17.424,9.061z"/> <g> <path d="M17.424,4.982c-0.276,0-0.5-0.224-0.5-0.5V0.5c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v3.982 C17.924,4.759,17.701,4.982,17.424,4.982z"/> <path d="M17.424,34.85c-0.276,0-0.5-0.224-0.5-0.5v-3.982c0-0.276,0.224-0.5,0.5-0.5s0.5,0.224,0.5,0.5v3.982 C17.924,34.626,17.701,34.85,17.424,34.85z"/> </g> <g> <path d="M4.482,17.925H0.5c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h3.981c0.276,0,0.5,0.224,0.5,0.5 S4.758,17.925,4.482,17.925z"/> <path d="M34.349,17.925h-3.982c-0.276,0-0.5-0.224-0.5-0.5s0.224-0.5,0.5-0.5h3.982c0.276,0,0.5,0.224,0.5,0.5 S34.625,17.925,34.349,17.925z"/> </g> <g> <path d="M8.274,8.771c-0.128,0-0.256-0.049-0.354-0.146L5.104,5.811c-0.195-0.195-0.195-0.512,0-0.707s0.512-0.195,0.707,0 l2.816,2.814c0.195,0.195,0.195,0.512,0,0.707C8.53,8.723,8.402,8.771,8.274,8.771z"/> <path d="M29.393,29.893c-0.128,0-0.256-0.049-0.354-0.146l-2.816-2.817c-0.195-0.195-0.195-0.512,0-0.707s0.512-0.195,0.707,0 l2.816,2.817c0.195,0.195,0.195,0.512,0,0.707C29.649,29.844,29.521,29.893,29.393,29.893z"/> </g> <g> <path d="M5.458,29.893c-0.128,0-0.256-0.049-0.354-0.146c-0.195-0.195-0.195-0.512,0-0.707l2.816-2.817 c0.195-0.195,0.512-0.195,0.707,0s0.195,0.512,0,0.707l-2.816,2.817C5.713,29.844,5.585,29.893,5.458,29.893z"/> <path d="M26.577,8.771c-0.128,0-0.256-0.049-0.354-0.146c-0.195-0.195-0.195-0.512,0-0.707l2.816-2.814 c0.195-0.195,0.512-0.195,0.707,0s0.195,0.512,0,0.707L26.93,8.625C26.833,8.723,26.705,8.771,26.577,8.771z"/> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g></svg></div>')
    const $tempIcon = $('<div class="forecast-icon"><img src="img/icons/' + getIconName(element['icon']) + '"></div>');
    $weather.append($temp);
    $weather.append($tempIcon);
    $('#forecast').append($line);
    $line.append($time);
    $line.append($weather);
}

// by type of weather we return an icon
function getIconName(name) {
    switch (name) {
        case 'flash' :
            return '001-flash.svg';
        case 'rain' :
            return '003-rain.svg';
        case 'cloud' :
            return '005-sky.svg';
        case 'partlyCloudy' :
            return '004-sky-1.svg';
        case 'sun' :
            return '002-sun.svg';
    }
}

// Check for the existence of a variable
function isset(variable) {
    return typeof (variable) != "undefined" && variable !== null;
}
