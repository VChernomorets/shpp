const ATM = {
    isAuth: false, 
    currentUser: {},
    // all cash available in ATM
    cash: 2000,
    // cash logs
    logs: [],
    // all available users
    users: [
        { id: "0000", pin: "000", debet: 0, type: "admin" }, // EXTENDED
        { id: "0025", pin: "123", debet: 675, type: "user" },
        { id: "user", pin: "123", debet: 11500, type: "user" }
    ],
    // authorization
    auth(id, pin) {
        if(this.isAuth){
            console.log("Вы уже авторизированы!");
            return;
        }
        for(let i = 0; i < this.users.length; i++){
            if(this.users[i].id === id){
                if(this.users[i].pin === pin){
                    console.log("Вы авторизированы!");
                    this.isAuth = true;
                    this.currentUser = this.users[i];
                    return;
                } else {
                    console.log("Пароль неверный!")
                }
            }
        }
        console.log("Нет такого пользователя!");
    },
    // check current debet
    check() {
        if(!this.isAuth){
            console.log("Вы не авторозированы!");
            return;
        }
        console.log(`На вашем счету: ${this.currentUser.debet}`);
    },
    // get cash - available for user only
    getCash(amount) {
        if(isNaN(amount)){
            console.log("Error!");
            return;
        }
        if(!this.isAuth){
            console.log("Вы не авторозированы!");
            return;
        }
        if(this.cash < amount){
            console.log("В банкомате нет такого количества денег!");
            return;
        }
        if(this.currentUser.debet < amount){
            console.log("На вашем счету недостаточно средсв!");
            return;
        }
        this.currentUser.debet -= amount;
        this.cash -= amount;
        this.logs.push(`Пользователь ${this.currentUser.id} снял с своего счета ${amount}. Баланс счета: ${this.currentUser.debet}. Баланс банкомата: ${this.cash}`);
        console.log(`Вы сняли: ${amount}. На счету осталось: ${this.currentUser.debet}`)
    },
    // load cash - available for user only
    loadCash(amount) {
        if(isNaN(amount)){
            console.log("Error!");
            return;
        }
        if(!this.isAuth){
            console.log("Вы не авторизированы!");
            return;
        }
        if(this.currentUser.type !== "user"){
            console.log("Недостаточно прав!");
            return;
        }
        this.currentUser.debet += amount;
        this.cash += amount;
        this.logs.push(`Пользователь ${this.currentUser.id} положил на свой счет ${amount}. Баланс счета: ${this.currentUser.debet}. Баланс банкомата: ${this.cash}`);
        console.log(`Вы пополнили счет на: ${amount}. Баланс счета: ${this.currentUser.debet}`)
    },
    // load cash to ATM - available for admin only - EXTENDED
    loadAtmCash(amount) {
        if(isNaN(amount)){
            console.log("Error!");
            return;
        }
        if(!this.isAuth){
            console.log("Вы не авторизированы!");
            return;
        }
        if(this.currentUser.type !== "admin"){
            console.log("Недостаточно прав!");
            return;
        }
        this.cash += amount;
        this.logs.push(`Пользователь ${this.currentUser.id} пополнил счет банкомата ${amount}. Баланс банкомата: ${this.cash}`);
    },

    // get cash actions logs - available for admin only - EXTENDED
    getLogs() {
        if(!this.isAuth){
            console.log("Вы не авторизированы!");
            return;
        }
        if(this.currentUser.type !== "admin"){
            console.log("Недостаточно прав!");
            return;
        }
        for (let i = 0; i < this.logs.length; i++) {
            console.log(this.logs[i]);
        }
    },
    // log out
    logout() {
        if(!this.isAuth){
            console.log("Вы не авторизированы!");
            return;
        }
        this.isAuth = false;
    },
};
