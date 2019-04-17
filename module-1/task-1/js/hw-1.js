'use strict'

const ADMIN_PASSWORD = 'm4ng0h4ckz';
let message;
message = prompt("Введите пароль!")
if(!message){
    alert('Отменено пользователем!');
}else if(message === ADMIN_PASSWORD)
{
    alert("'Добро пожаловать!'")
}else {
    message = "Доступ запрещен, неверный пароль!"
}

alert(message)


