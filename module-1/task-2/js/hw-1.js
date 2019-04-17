'use strict'

// Задача 2
let credits = 23580;

let pricePerDroid = 3000;

let quantity = prompt("сколько вы  хотите  купить дроидов ?");
const totalPrice = quantity * pricePerDroid;
if (quantity === null) {
    console.log('Отменено пользователем!');
} else {
    
    if (totalPrice > credits) {
        console.log("Недостаточно средств на счету!");
    }
    else {
        console.log(`Вы купили ${quantity} дроидов , на счету осталось ${credits - totalPrice} кредитов `)
    }
}

