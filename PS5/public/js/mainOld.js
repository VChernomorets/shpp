$(document).ready(function () {

    checkSession();

    function checkSession(){
        let result;
        $.ajax({
            type: 'post',
            url: '../application/handler.php',
            data: 'type=check',
            dataType: 'json',
            success: (answer) => {
                result = answer;
                if(answer['session']){
                    displayChat();
                } else {
                    displayLogin();
                }
            }
        });
    }


    $('.login__form').submit(function(e) {
        e.preventDefault();
        let $form = $(this);
        $.ajax({
            type: 'post',
            url: '../application/handler.php',
            data: $form.serialize(),
            dataType: 'json',
            success: function (answer) {
                displayErrors(answer);
            }
        });
    });

    function displayErrors(answer) {
        if(answer === 'successful'){
            displayChat();
            return;
        }
        let errors = ['wrongPasswordError', 'usernameError', 'passwordError'];
        errors.forEach((element) => {
           $('#' + element).css('display' , 'none');
        });
        answer['errors'].forEach( (element) => {
            $('#'+element).fadeIn('show');
        });
    }

    function displayChat() {
        displayForm( '.chat', '.login');
        getMessages();
        sendMessage();
    }

    function sendMessage() {
        $('.send').submit(function (e) {
            e.preventDefault();
            let $form = $(this);
            $.ajax({
                type: 'post',
                url: '../application/handler.php',
                data: $form.serialize(),
                dataType: 'json',
                success: function (answer) {

                }
            });
        });
    }

    function getMessages() {

    }

    function displayLogin() {
        displayForm('.login', '.chat');
    }
    
    function displayForm(show, hide) {
        $(hide).css('display', 'none');
        $(show).css('display', 'block');
    }
});