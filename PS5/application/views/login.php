<section class="login">
    <h1 class="logo">Easy Chat</h1>
    <form class="login__form" action="../application/handler.php" method="post">
        <label class="login__label" for="username">Enter your name</label>
        <input class="login__input" type="text" name="username" id="username" placeholder="John Doe" required>
        <label class="login__label" for="password">Enter your password</label>
        <input class="login__input" type="password" name="password" id="password" placeholder="•••••" required>
        <input type="hidden" name="type" value="login">
        <input class="login__submit" type="submit" value="Login / Registration" name="login">
        <div class="login__shadow"></div>
    </form>
</section>