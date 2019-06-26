$(document).ready(function () {
    // Display users
    let users = ['Vlad Novikov', 'Dmitriy Krasnov', 'Oleg Smirnov', 'User Name'];
    for (let i = 0; i < users.length; i++) {
        let imagesBlock = $('<div></div>').addClass("select__avatar").append('<i></i>').addClass('fas fa-user');
        let userName = $('<span></span>').addClass('select__userName').text(users[i]);
        let option = $('<div></div>').addClass('select__option').append(imagesBlock, userName);
        $('#options').append(option);
    }

    // Process click on select
    $('.select').click(() => {
        $('.select__options').toggle('show');
    });

    // Process click on option
    $('.select__option').click(function () {
        $('.select__option').css('background-color', '');
        $(this).css('background-color', '#F3F3F3');
        let userName = $(this).children('.select__userName').text();
        let imagesBlock = $('<div></div>').addClass("select__avatar").append('<i></i>').addClass('fas fa-user');
        let userNameBlock = $('<span></span>').addClass('select__userName').text(userName);
        $('.selected__default').text("").append(imagesBlock, userNameBlock);
    });
});