$(document).ready(function () {

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
                if(login === 'successful'){
                    displayChat();
                }
            }

            if(isset(answer['send'])){
                console.log(answer);
            }
        }

        function displayErrors(login) {
            let errors = ['wrongPasswordError', 'usernameError', 'passwordError'];
            errors.forEach((element) => {
                $('#' + element).css('display', 'none');
            });
            login['errors'].forEach((element) => {
                $('#' + element).fadeIn('show');
            });
        }

        function displayChat() {
            displayForm('.chat', '.login');
            send();
        }

        function send() {
            $('.send').submit(function (e) {
                e.preventDefault();
                query($(this).serialize());
            });
        }

        function displayLogin() {
            displayForm('.login', '.chat');
            console.log('display login');
        }

        function isset(variable) {
            return typeof (variable) != "undefined" && variable !== null;
        }

        function displayForm(show, hide) {
            $(hide).css('display', 'none');
            $(show).css('display', 'block');
        }
    }
);