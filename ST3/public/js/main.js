$(document).ready(() => {
    let messageId = 0;

   $('#main').on('dblclick', function(e) {
       if(!$(this).is(e.target)){
           return;
       }
       const MARGIN_AFTER = 27;
       const SIZE_AFTER = 8;
       const $message = $('<div></div>').addClass('message').attr('id', 'm' + messageId);
       messageId++;
       const $input = $('<input type="text">').addClass('message__input');
       $message.append($input);
       $(this).append($message);
       let positionY = +e.clientY - (+$message.outerHeight() + +SIZE_AFTER) + 'px';
       let positionX = +e.clientX - (+$message.outerWidth() - +MARGIN_AFTER) + 'px';
       $message.css('left', positionX).css('top', positionY);
       $message.draggable({containment: 'parent'});
       $input.on('keydown', enterMessage);
       $input.on('blur', function () {addMessage($(this))});
       $input.focus();
    })
});

function enterMessage(e) {
    if (e.code === 'Enter'){
        addMessage($(this));
    }
    if(e.code === 'Escape' ){
        deleteMessage($(this).parent());
    }
}

function editMessage(e) {
    const $input = $('<input type="text">').addClass('message__input').val($(this).text());
    $(this).parent().append($input);
    $input.on('keydown', enterMessage);
    $input.on('blur', function () {addMessage($(this))});
    $input.focus();
    $(this).remove();
}

function addMessage(element) {
    saveMessage(element);
    const textMessage = element.val();
    if(textMessage === ''){
        deleteMessage(element.parent());
    }
    const $text = $('<p></p>').addClass('message__text').text(textMessage);
    element.parent().append($text);
    $text.on('dblclick', editMessage);
    element.remove();
}

function deleteMessage(element) {
    const id = element.attr('id');
    query('type=deleteMessage&id=' + id);
    element.remove();
}

function saveMessage(element) {
    const parent = element.parent();
    const message  = {
        text: element.val(),
        id: parent.attr('id'),
        y: parent.css('top'),
        x: parent.css('left'),
        toString: function () {
            return 'text=' + this.text + '&id=' + this.id + '&y=' + this.y + '&x=' + this.x;
        }
    };
    query('type=saveMessage&' + message.toString());
}

function query(data) {
    $.ajax({
        type: 'post',
        url: 'handler.php',
        data: data,
        dataType: 'json',
        success: function (answer) {
            handler(answer);
        },
        error: function (answer) {
            console.log(answer['responseText']);
        }
    });
}

function handler(answer) {
    console.log(answer)
}