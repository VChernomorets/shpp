$(document).ready(function () {
    let messagesFlag = false;
    let scrollFag = false;
    const MESSAGE_UPDATE_RATE = 1000;
    let lastMessageId = -1;
    checkSession();

    function checkSession() {
        query('type=check');
    }

    $('.login__form').submit(function (e) {
        e.preventDefault();
        query($(this).serialize());
    });

    function query(date) {
        $.ajax({
            type: 'post',
            url: '../application/handler.php',
            data: date,
            dataType: 'json',
            success: function (answer) {
                handler(answer);
            }
        });
    }

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
    }

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

    function scrollChat($chat) {
        if(scrollFag){
            $chat.scrollTop(Math.round($chat.prop('scrollHeight') - $chat.height()));
        }
    }

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

    function displayErrors(answer) {
        let errors = ['wrongPasswordError', 'usernameError', 'passwordError', 'emptyMessage'];
        errors.forEach((element) => {
            $('#' + element).css('display', 'none');
        });
        answer['errors'].forEach((element) => {
            $('#' + element).fadeIn('show');
        });
    }

    function displayChat() {
        messagesFlag = true;
        displayForm('.chat', '.login');
        getMessages();
    }

    function getMessages() {
        let test = setInterval(function () {
            if (!messagesFlag) {
                clearInterval(test);
            }
            query('type=getMessage&id=' + lastMessageId);
        }, MESSAGE_UPDATE_RATE)
    }

    $('.send').submit(function (e) {
        e.preventDefault();
        query($(this).serialize());
        $('#send__message').val('');
    });

    function displayLogin() {
        messagesFlag = false;
        displayForm('.login', '.chat');
    }

    function isset(variable) {
        return typeof (variable) != "undefined" && variable !== null;
    }

    function displayForm(show, hide) {
        $(hide).css('display', 'none');
        $(show).css('display', 'block');
    }
});