$(document).ready(function () {
    ('.login__form').submit(function(e) {
        e.preventDefault();
        let $form = $(this);
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize(),
            success: function (answer) {
                alert(answer);
            }
        });
    });
});