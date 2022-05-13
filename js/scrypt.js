"use strict"

/*------------Объявление всех констант--------------*/
const nameInputCity = document.querySelector(".citygame__input");
const messageToPrint = document.querySelector(".citygame__message");
const confirmCityButton = document.querySelector(".citygame__button");
const lastCityLetterRed = document.querySelector(".citygame__lastcity");
const startButton = document.querySelector(".welcome__button");
const welcomePage = document.querySelector(".welcome");
const cityGameStart = document.querySelector(".citygame");
const nowPlayerName = document.querySelector(".nameplayer");
const playerForm = document.querySelector(".playerform");
const firstPlayerInput = document.querySelector(".firstplayer");
const secondPlayerInput = document.querySelector(".secondplayer");
const popupWinnerPlayerOne = document.querySelector(".winner__player_one"); //кнопка победителя 1
const popupWinnerPlayerTwo = document.querySelector(".winner__player_two"); //кнопка победителя 2
const popupCloseButton = document.querySelector(".popup__close"); //Крестик у попапа
const popupMain = document.querySelector(".popup"); //Весь попап
const concedePopup = document.querySelector(".citygame__concede"); //Кнопка закончить игру
const finalWinner = document.querySelector(".finalwinner"); //победитель игры сюда пишем
const finalStatisticsCities = document.querySelector(".statistics__cities"); // Сюда пишем длинну массива cities
const finalStatisticsTimer = document.querySelector(".statistics__timer"); // Сюда пишем затраченное время на игру
const finalScreen = document.querySelector(".finish ");
const finalConfetti = document.querySelector(".confetti");
const restartGameButton = document.querySelector(".finish__restart");
/*------------Создание пустого массива из городов и игроков--------------*/
let cities = [];
let players = [];
/*------------Запоминание имен игроков--------------*/
startButton.addEventListener("mousedown", getPlayers);
function getPlayers() {
    players.push(firstPlayerInput.value);
    players.push(secondPlayerInput.value);
    console.log(players);
    popupWinnerPlayerOne.innerHTML = players[0];
    popupWinnerPlayerTwo.innerHTML = players[1];
};
/*------------Секундомер-------------*/
var min = 0;
var hour = 0;
var sec = 0;
function init() {
    sec = 0;
    setInterval(tick, 1000);
}
function tick() {
    sec++;
    if (sec >= 60) { //задаем числовые параметры, меняющиеся по ходу работы программы
        min++;
        sec = sec - 60;
    }
    if (min >= 60) {
        hour++;
        min = min - 60;
    }
    /*
    if (sec < 10) { //Визуальное оформление
        if (min < 10) {
            if (hour < 10) {
                document.getElementById('timer').innerHTML ='0' + hour + ':0' + min + ':0' + sec;
            } else {
                document.getElementById('timer').innerHTML = hour + ':0' + min + ':0' + sec;
            }
        } else {
            if (hour < 10) {
                document.getElementById('timer').innerHTML = '0' + hour + ':' + min + ':0' + sec;
            } else {
                document.getElementById('timer').innerHTML = hour + ':' + min + ':0' + sec;
            }
        }
    } else {
        if (min < 10) {
            if (hour < 10) {
                document.getElementById('timer').innerHTML = '0' + hour + ':0' + min + ':' + sec;
            } else {
                document.getElementById('timer').innerHTML = hour + ':0' + min + ':' + sec;
            }
        } else {
            if (hour < 10) {
                document.getElementById('timer').innerHTML = '0' + hour + ':' + min + ':' + sec;
            } else {
                document.getElementById('timer').innerHTML = hour + ':' + min + ':' + sec;
            }
        }
    }
    */
}
window.addEventListener("load", function (event) {
    init();
});
/*------------Логика попапа с выбором победителя--------------*/
popupCloseButton.addEventListener('click', closePopup);
function closePopup() {
    popupMain.classList.toggle("_close");
};
concedePopup.addEventListener('click', closePopup);
/*------------Закрытие формы регистрации + открытие игры--------------*/
function startGame() {
    welcomePage.classList.add("_hide");
    cityGameStart.classList.add("_start");
    nowPlayerName.innerHTML = `${players[0]}`;
};
startButton.addEventListener('click', startGame);
/*------------Фукнции для добавления городов в массив--------------*/
confirmCityButton.addEventListener('click', addCity);
function addCity() {
    var nameInputCityValue = nameInputCity.value.toLowerCase();
    /*------------Добавление первого слова без проверок его первой буквы--------------*/
    if (cities.length == 0) {
        cities.push(nameInputCityValue);
        nameInputCity.value = ""; //Обнуление поля ввода города;
        if (nowPlayerName.innerHTML == players[0]) {
            nowPlayerName.innerHTML = `${players[1]}`;
        } else if (nowPlayerName.innerHTML == players[1]) {
            nowPlayerName.innerHTML = `${players[0]}`;
        };
        if (nameInputCityValue[nameInputCityValue.length - 1] == 'ь') {
            lastCityLetterRed.innerHTML = `Предыдущий город - <span class="lastcity">${nameInputCityValue} <p class = "redlettertwo">${nameInputCityValue[nameInputCityValue.length - 2]}</p> </span>`;
        }
        else if (nameInputCityValue[nameInputCityValue.length - 1] == 'ъ') {
            lastCityLetterRed.innerHTML = `Предыдущий город - <span class="lastcity">${nameInputCityValue} <p class = "redletterthree">${nameInputCityValue[nameInputCityValue.length - 2]}</p> </span>`;
        }
        else if (nameInputCityValue[nameInputCityValue.length - 1] == 'ы') {
            lastCityLetterRed.innerHTML = `Предыдущий город - <span class="lastcity">${nameInputCityValue} <p class = "redletterfour">${nameInputCityValue[nameInputCityValue.length - 2]}</p> </span>`;
        }
        else {
            lastCityLetterRed.innerHTML = `Предыдущий город - <span class="lastcity">${nameInputCityValue} <p class = "redletter">${nameInputCityValue[nameInputCityValue.length - 1]}</p> </span>`;
        }
    };
    /*------------Послоедний город + его последняя буква--------------*/
    var lastCity = cities[cities.length - 1];
    var lastCityLetter = lastCity[lastCity.length - 1];
    /*------------Проверка на ненужную букву в конце города--------------*/
    if (lastCityLetter == 'ь' || lastCityLetter == 'ъ' || lastCityLetter == 'ы') {
        // ЕСТЬ ЗАПРЕТНАЯ БУКВА, ЗНАЧИТ СЧИТАЕМ ПРЕДЫДУЩУЮ ПЕРЕД НЕЙ
        var lastCityLetterGood = lastCity[lastCity.length - 2];
        if (nameInputCityValue[0] == lastCityLetterGood) {
            cities.push(nameInputCityValue);
            nameInputCity.value = ""; //Обнуление поля ввода города
            if (nowPlayerName.innerHTML == players[0]) {
                nowPlayerName.innerHTML = `${players[1]}`;
            } else if (nowPlayerName.innerHTML == players[1]) {
                nowPlayerName.innerHTML = `${players[0]}`;
            };
            //lastCityLetterRed.innerHTML = `Предыдущий город - <span class="lastcity">${nameInputCityValue} <p class = "redlettertwo">${nameInputCityValue[nameInputCityValue.length - 1]}</p> </span>`;
            if (nameInputCityValue[nameInputCityValue.length - 1] == 'ь') {
                lastCityLetterRed.innerHTML = `Предыдущий город - <span class="lastcity">${nameInputCityValue} <p class = "redlettertwo">${nameInputCityValue[nameInputCityValue.length - 2]}</p> </span>`;
            }
            else if (nameInputCityValue[nameInputCityValue.length - 1] == 'ъ') {
                lastCityLetterRed.innerHTML = `Предыдущий город - <span class="lastcity">${nameInputCityValue} <p class = "redletterthree">${nameInputCityValue[nameInputCityValue.length - 2]}</p> </span>`;
            }
            else if (nameInputCityValue[nameInputCityValue.length - 1] == 'ы') {
                lastCityLetterRed.innerHTML = `Предыдущий город - <span class="lastcity">${nameInputCityValue} <p class = "redletterfour">${nameInputCityValue[nameInputCityValue.length - 2]}</p> </span>`;
            }
            else {
                lastCityLetterRed.innerHTML = `Предыдущий город - <span class="lastcity">${nameInputCityValue} <p class = "redletter">${nameInputCityValue[nameInputCityValue.length - 1]}</p> </span>`;
            }
        }
    }
    else if (nameInputCityValue[0] == lastCityLetter) {
        cities.push(nameInputCityValue);
        nameInputCity.value = ""; //Обнуление поля ввода города
        if (nowPlayerName.innerHTML == players[0]) {
            nowPlayerName.innerHTML = `${players[1]}`;
        } else if (nowPlayerName.innerHTML == players[1]) {
            nowPlayerName.innerHTML = `${players[0]}`;
        };
        if (nameInputCityValue[nameInputCityValue.length - 1] == 'ь') {
            lastCityLetterRed.innerHTML = `Предыдущий город - <span class="lastcity">${nameInputCityValue} <p class = "redlettertwo">${nameInputCityValue[nameInputCityValue.length - 2]}</p> </span>`;
        }
        else if (nameInputCityValue[nameInputCityValue.length - 1] == 'ъ') {
            lastCityLetterRed.innerHTML = `Предыдущий город - <span class="lastcity">${nameInputCityValue} <p class = "redletterthree">${nameInputCityValue[nameInputCityValue.length - 2]}</p> </span>`;
        }
        else if (nameInputCityValue[nameInputCityValue.length - 1] == 'ы') {
            lastCityLetterRed.innerHTML = `Предыдущий город - <span class="lastcity">${nameInputCityValue} <p class = "redletterfour">${nameInputCityValue[nameInputCityValue.length - 2]}</p> </span>`;
        }
        else {
            lastCityLetterRed.innerHTML = `Предыдущий город - <span class="lastcity">${nameInputCityValue} <p class = "redletter">${nameInputCityValue[nameInputCityValue.length - 1]}</p> </span>`;
        }
    }
};
// срабатывания для Enter
nameInputCity.addEventListener('keypress', function (keybutton) {
    if (keybutton.key === "Enter") {
        addCity();
    }
});
/*------------Финальная страница конца игры--------------*/
function statisctcsCounter() {
    finalStatisticsCities.innerHTML = `${testcon}`;
    console.log(testcon);
};

popupWinnerPlayerOne.addEventListener('click', finishGameScreenOne);
popupWinnerPlayerTwo.addEventListener('click', finishGameScreenTwo);


function finishGameScreenOne() {
    finalScreen.classList.toggle("_hide");
    cityGameStart.classList.add("_end");
    finalWinner.innerHTML = `${players[0]}`;
    finalStatisticsCities.innerHTML = `${cities.length}`;
    finalStatisticsTimer.innerHTML = `${hour}<p class="time">ч</p>${min}<p class="time">мин</p>${sec}<p class="time">сек</p>`;
    popupMain.classList.toggle("_close");
    finalConfetti.classList.remove("_block");
}

function finishGameScreenTwo() {
    finalScreen.classList.toggle("_hide");
    cityGameStart.classList.add("_end");
    finalWinner.innerHTML = `${players[1]}`;
    finalStatisticsCities.innerHTML = `${cities.length}`;
    finalStatisticsTimer.innerHTML = `${hour}<p class="time">ч</p>${min}<p class="time">мин</p>${sec}<p class="time">сек</p>`;
    popupMain.classList.toggle("_close");
    finalConfetti.classList.remove("_block");
}

restartGameButton.addEventListener('click', restartPage);

function restartPage(){
    location.reload();
}
