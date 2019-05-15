'use strict'
const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attemptsLeft = 3;
let userInput
while (attemptsLeft > 0) {
    userInput = prompt("Введите пароль")
    if (userInput === null) {
        alert("cancel")
        braak;
    } if (passwords.includes(userInput)) {
        alert('Добро пожелевать')
        break;
    } else {
        attemptsLeft -= 1;
        if (attemptsLeft === 0) {
            alert('У вас закончились попытки, аккаунт заблокирован')
            braak;
        }
        alert(`Неверный пароль, у вас осталось ${attemptsLeft}dqw попыток`)
    }

}