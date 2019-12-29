$(document).ready(function () {

    // if true - makes message requests
    let messagesFlag = false;
    // if true - automatically scroll chat
    let scrollFag = false;
    // Message Request Delay
    const MESSAGE_UPDATE_RATE = 1000;
    // id of the last message, if -1, then the chat is empty.
    let lastMessageId = -1;
    checkSession();

    // authorization check
    function checkSession() {
        query('type=check');
    }

    // authorization form submission processing
    $('.login__form').submit(function (e) {
        e.preventDefault();
        query($(this).serialize());
    });

    // makes requests to the server, transfers certain data.
    function query(date) {
        $.ajax({
            type: 'post',
            url: '../application/handler.php',
            data: date,
            dataType: 'json',
            success: function (answer) {
                handler(answer);
            }, error: function (answer) {
                console.log(answer);
            }
        });
    }

    // processes the response from the server
    function handler(answer) {
        if (isset(answer['check'])) {
            if (answer['check']) {
                displayChat();
            } else {
                displayLogin();
            }
        }
        if (isset(answer['login'])) {
            let login = answer['login'];
            if (isset(login['errors'])) {
                displayErrors(login);
            }
            if (login === 'successful') {
                displayChat();
            }
        }
        if (isset(answer['send'])) {
            let send = answer['send'];
            if (isset(send['errors'])) {
                if (send['errors'] === "loginFailed") {
                    displayLogin();
                }
                displayErrors(send);
            } else {  
                $('#emptyMessage').css('display', 'none');
            }
        }
        if (isset(answer['getMessage'])) {
            let message = answer['getMessage'];
            if (isset(message['errors'])) {
                if (message['errors'] === "loginFailed") {
                    messagesFlag = false;
                    displayLogin();
                }
            } else {
                let $chat = $('.chat__messagesBlock');
                scrollFag = $chat.prop('scrollHeight') === Math.round($chat.height() + $chat.scrollTop());
                displayMessages(message);
                scrollChat($chat);
            }
        }
        if(isset(answer['getUserName'])){
            displayWelcome(answer['getUserName']['username']);
        }
    }

    // Displays a greeting
    function displayWelcome(username) {
        $('#welcome__username').text(username);
        $('.welcome').fadeIn("normal");
        setTimeout(function () {
            $('.welcome').fadeOut("normal");
        }, 1000);
    }

    // displays chat messages
    function displayMessages(messages) {
        messages.forEach(function (item) {
            lastMessageId = item['id'];
            const date = $('<span>').addClass('message__time').text(item['date']);
            const username = $('<b>').addClass('message__name').text(item['username'] + ': ');
            const message = $('<span>').addClass('message__text').text(replaceSmile(item['messages']));
            const wholeMessage = $('<p>').addClass('message').append(date, username, message);
            $('.chat__messagesBlock').append(wholeMessage);
        });
    }

    // automatically scroll the chat to the end
    function scrollChat($chat) {
        if(scrollFag){
            $chat.scrollTop(Math.round($chat.prop('scrollHeight') - $chat.height()));
        }
    }

    // changes text emoticons to graphic ones
    function replaceSmile(message) {
        let smile = [{
            'text': ':)',
            'smile' : '😊'
        }, {
            'text': ':(',
            'smile' : '😟'
        }];
        smile.forEach(function (item) {
            message = message.replace(item['text'], item['smile']);
        });
        return message;
    }

    // handles all validation errors that come from the server.
    function displayErrors(answer) {
        let errors = ['wrongPasswordError', 'usernameError', 'passwordError', 'emptyMessage'];
        errors.forEach((element) => {
            $('#' + element).css('display', 'none');
        });
        answer['errors'].forEach((element) => {
            $('#' + element).fadeIn('show');
        });
    }
    // Shows chat
    function displayChat() {
        getUserName();
        messagesFlag = true;
        displayForm('.chat', '.login');

        getMessages();
    }

    // Requests a message from the server
    function getMessages() {
        let test = setInterval(function () {
            if (!messagesFlag) {
                clearInterval(test);
            }
            query('type=getMessage&id=' + lastMessageId);
        }, MESSAGE_UPDATE_RATE)
    }

    // handles pushing a message
    $('.send').submit(function (e) {
        e.preventDefault();
        query($(this).serialize());
        $('#send__message').val('');
    });

    // displays the authorization form on the screen
    function displayLogin() {
        messagesFlag = false;
        displayForm('.login', '.chat');
    }

    // Cool method. Checks for the existence of a variable.
    function isset(variable) {
        return typeof (variable) != "undefined" && variable !== null;
    }

    // It hides one form, the second. shows.
    function displayForm(show, hide) {
        $(hide).css('display', 'none');
        $(show).css('display', 'block');
    }

    // recognizes username by session
    function getUserName() {
        query('type=getUserName');
    }

    $('#out').on('click', () => {
        query('type=out');
        location.reload();
    })
});