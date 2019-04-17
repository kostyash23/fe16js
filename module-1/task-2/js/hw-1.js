'use strict'

// Задача 2
let credits = 23580;

let pricePerDroid = 3000;

let quantity = prompt("сколько вы  хотите  купить дроидов ?");

let totalPrice
if (!quantity) {
    alert('Отменено пользователем!');
} else {
    const totalPrice = quantity * pricePerDroid;
    if (totalPrice > credits) {
        alert("Недостаточно средств на счету!");
    }
    else {
        alert(`Вы купили ${quantity} дроидов , на счету осталось ${credits - totalPrice} кредитов `)
    }
}

