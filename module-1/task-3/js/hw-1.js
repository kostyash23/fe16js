'use strict'



let country = prompt("выберите  страну");
const priceChina = 100;
const priceAmerica = 250;
const priceAustralia = 170;
const priceIndia = 80;
const priceJamaica = 120;

if (country === null) {
    console.log("Нажили отмену!");

}else{

country = country.toLowerCase();
switch (country) {

    case 'китай':
        console.log(`Доставка в ${country} будет стоить ${priceChina} кредитов`)
        break;
    case 'южная америка':
        console.log(`Доставка в ${country} будет стоить ${priceAmerica} кредитов`)
        break;
    case 'австралия':
        console.log(`Доставка в ${country} будет стоить ${priceAustralia} кредитов`)
        break;
    case 'индия':
        console.log(`Доставка в ${country} будет стоить ${priceIndia} кредитов`)
        break;
    case 'ямайка':
        console.log(`Доставка в ${country} будет стоить ${priceJamaica} кредитов`)
        break;
    default:
        ('В вашей стране доставка не доступна')
}}