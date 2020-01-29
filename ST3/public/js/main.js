//new message id
let messageId = 0;

$(document).ready(() => {
    // We process a double click on the background. Double-clicking to create a message.
   $('#main').on('dblclick', function(e) {
       if(!$(this).is(e.target)){
           return;
       }
       const MARGIN_AFTER = 27;
       const SIZE_AFTER = 8;
       const $message = $('<div></div>').addClass('message').attr('id', 'm' + messageId);
       const $input = $('<input type="text">').addClass('message__input');
       $message.append($input);
       $(this).append($message);
       let positionY = +e.clientY - (+$message.outerHeight() + +SIZE_AFTER) + 'px';
       let positionX = +e.clientX - (+$message.outerWidth() - +MARGIN_AFTER) + 'px';
       $message.css('left', positionX).css('top', positionY);
       addDraggable($message);
       $input.on('keydown', enterMessage);
       $input.on('blur', function () {addMessage($(this))});
       $input.focus();
    });

   // request messages from the server
   query('type=getMessages');
});

// Making the element moveable
function addDraggable(element) {
    element.draggable({
        containment: 'parent',
        stop: function () {
            saveMessage($(this));
        }
    });
}

// Create a message received from the server
function createMessage(id, x,y, text) {
    const $message = $('<div></div>').addClass('message').attr('id', 'm' + id);
    const $text = $('<p></p>').addClass('message__text').text(text);
    $message.append($text);
    $('#main').append($message);
    $message.css('left', x + 'px').css('top', y + 'px');
    $text.on('dblclick', editMessage);
    addDraggable($message);
    messageId = +id + 1;
}

// We process the end of the message in the field
function enterMessage(e) {
    if (e.code === 'Enter'){
        addMessage($(this));
    }
    if(e.code === 'Escape' ){
        deleteMessage($(this).parent());
    }
}

// Processing message editing
function editMessage(e) {
    const $input = $('<input type="text">').addClass('message__input').val($(this).text());
    $(this).parent().append($input);
    $input.on('keydown', enterMessage);
    $input.on('blur', function () {addMessage($(this))});
    $input.focus();
    $(this).remove();
}

// Add a message to the screen.
function addMessage(element) {
    const textMessage = element.val();
    if(textMessage === ''){
        deleteMessage(element.parent());
        return;
    }
    const parent = element.parent();
    const width = parent.outerWidth();
    const $text = $('<p></p>').addClass('message__text').text(textMessage);
    parent.append($text);
    $text.on('dblclick', editMessage);
    messageId++;
    element.remove();
    parent.css('left' , +parent.css('left').replace('px', '') - (+parent.outerWidth() - width));
    saveMessage(parent);
}

// recognize the id of the element and delete it
function deleteMessage(element) {
    const id = element.attr('id');
    query('type=deleteMessage&id=' + id.replace('m', ''));
    element.remove();
}

// We make a request to save the message on the server
function saveMessage(element) {
    const message  = {
        text: element.text(),
        id: element.attr('id').replace('m', ''),
        y: element.css('top').replace('px', ''),
        x: element.css('left').replace('px', ''),
        toString: function () {
            return 'text=' + this.text + '&id=' + this.id + '&y=' + this.y + '&x=' + this.x;
        }
    };
    query('type=saveMessage&' + message.toString());
}

// Sending a request to the server
function query(data) {
    $.ajax({
        type: 'post',
        url: 'handler.php',
        data: data,
        dataType: 'json',
        success: function (answer) {
            handler(answer);
        }
    });
}

// We process responses from the server
function handler(answer) {

    // Processing a request for receiving messages
    if(isset(answer['getMessages'])){
        const messages = answer['getMessages'];
        messages.forEach((message) => {
            createMessage(message['id'], message['x'], message['y'], message['text']);
        })
    }
}

// Cool method. Checks for the existence of a variable.
function isset(variable) {
    return typeof (variable) != "undefined" && variable !== null;
}