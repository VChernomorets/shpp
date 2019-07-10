$(document).ready(function () {
    const $btnTop = $('#goToTop');

    // show up arrow if man skipped down
    $(window).scroll(function () {
        $(this).scrollTop() > 300 ? $btnTop.fadeIn() : $btnTop.fadeOut();
    });

    // smoothly scroll the page up
    $($btnTop).click(function () {
        $('html, body').animate({scrollTop:0},500);
        return false;
    });

    // we process click on the menu and we scroll to the certain block
    $('nav a').click(function () {
       const target = $(this).attr('href');
       const offset = $(window).innerHeight() > $(target).innerHeight() ? $(target).offset().top - ($(window).innerHeight() - $(target).innerHeight())/2 : $(target).offset().top;
       $('html, body').animate({scrollTop:offset},500);
        return false;
    });
});