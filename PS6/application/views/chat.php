<div class="welcome">
    <div class="welcome__message">Welcome, <b id="welcome__username"></b>!</div>
</div>
<div class="chat">
    <h1 class="logo">Easy Chat</h1>
    <div class="chat__messagesBlock">
    </div>
    <form class="send" action="../application/handler.php" method="post">
        <div id="emptyMessage" class="error">Message must not be empty!</div>
        <input type="hidden" name="type" value="send">
        <input class="send__message" id="send__message" type="text" name="message">
        <input type="submit" name="sendMessage" class="send__sendMessage" value="Send">
    </form>
</div>