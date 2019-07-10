$(document).ready(function () {
    // Display users
    const users = ['Frank Johnson', 'Hidden Magic', 'Oliver Moss', 'User Name', 'Frank River'];
    const icons = ['fas fa-user-graduate', 'fas fa-user', 'far fa-user', 'fas fa-user-tie', 'fas fa-user-shield'];
    for (let i = 0; i < users.length; i++) {
        const imagesBlock = $('<div></div>').addClass('select__avatar').addClass(icons[i]);
        const userName = $('<span></span>').addClass('select__userName').text(users[i]);
        const option = $('<div></div>').addClass('select__option').append(imagesBlock, userName);
        $('#options').append(option);
    }

    // Process click on select
    let animationFlag = false;
    $('.select').on( 'click', function () {
        if(animationFlag){
            return;
        }
        animationFlag = true;
        $('.select__options').toggle('show', () => animationFlag = false );
    });

    $(document).on( 'click',function (e){
        const div = $('.select');
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            $('.select__options').hide();
        }
    });

    // Process click on option
    $('.select__option').on('click',function () {
        $('.select__option').removeClass('select__option-selected');
        $(this).addClass('select__option-selected');
        const userName = $(this).children('.select__userName').text();
        const icon = $(this).children('.select__avatar').attr('class');
        const imagesBlock = $('<div></div>').addClass(icon);
        const userNameBlock = $('<span></span>').addClass('select__userName').text(userName);
        $('.selected__default').text("").append(imagesBlock, userNameBlock);
    });
});