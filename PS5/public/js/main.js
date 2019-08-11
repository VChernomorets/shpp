$(document).ready(function () {
    // флаг для скролинга сообщений
    let messagesFlag = false;
    // chat message refresh rate
    const MESSAGE_UPDATE_RATE = 1000;
    // Last chat message. If -1, then there are no messages in the chat
    let lastMessageId = -1;
    // user authorization check
    checkSession();

    // Server request with session verification
    function checkSession() {
        query('type=check');
    }

    // Processing submit form submission
    $('.login__form').submit(function (e) {
        e.preventDefault();
        query($(this).serialize());
    });

    // makes a request to the server
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

    // processes all responses from the server
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
        if(isset(answer['getMessage'])){
            let message = answer['getMessage'];
            if(isset(message['errors'])){
                if(message['errors'] === "loginFailed"){
                    messagesFlag = false;
                    displayLogin();
                }
            } else {
                displayMessages(message);
            }
        }
    }

    // chat message output
    function displayMessages(messages) {
        messages.forEach(function (item) {
            lastMessageId = item['id'];
            const date = $('<span>').addClass('message__time').text(item['date']);
            const username = $('<b>').addClass('message__name').text(item['username'] + ': ');
            const message = $('<span>').addClass('message__text').text(item['messages']);
            const wholeMessage = $('<p>').addClass('message').append(date, username, message);
            $('.chat__messagesBlock').append(wholeMessage);
        });
    }

    // output of all errors
    function displayErrors(answer) {
        let errors = ['wrongPasswordError', 'usernameError', 'passwordError', 'emptyMessage'];
        errors.forEach((element) => {
            $('#' + element).css('display', 'none');
        });
        answer['errors'].forEach((element) => {
            $('#' + element).fadeIn('show');
        });
    }

    // displays chat
    function displayChat() {
        messagesFlag = true;
        displayForm('.chat', '.login');
        getMessages();
    }

    // Makes a request to the site to receive messages
    function getMessages() {
        let test = setInterval(function () {
            if(!messagesFlag){
                clearInterval(test);
            }
            query('type=getMessage&id=' + lastMessageId);
        }, MESSAGE_UPDATE_RATE)
    }

    // message sending processing
    $('.send').submit(function (e) {
        e.preventDefault();
        query($(this).serialize());
    });

    // Displays the registration form
    function displayLogin() {
        messagesFlag = false;
        displayForm('.login', '.chat');
    }

    // insanely cool method. Checks for the existence of a variable
    function isset(variable) {
        return typeof (variable) != "undefined" && variable !== null;
    }

    // displays one form, hides another
    function displayForm(show, hide) {
        $(hide).css('display', 'none');
        $(show).css('display', 'block');
    }
});