<div class="chat">
    <h1 class="logo">Easy Chat</h1>
    <div class="chat__messagesBlock">
        <p class="message">
            <span class="message__time">15:47:15</span>
            <b class="message__name">Nastya:</b>
            <span class="message__text">Lorem ipsum dolor sit amet, consectetur adipiddf elit. Aut, ex?</span>
        </p>
        <p class="message">
            <span class="message__time">15:47:15</span>
            <b class="message__name">Nastya:</b>
            <span class="message__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, ex?</span>
        </p>
    </div>
    <form class="send" action="../application/handler.php" method="post">
        <input type="hidden" name="type" value="send">
        <input class="send__message" type="text" name="message" required>
        <input type="submit" name="sendMessage" class="send__sendMessage" value="Send">
    </form>
</div>