'use strict';

const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let circleTurn;
let xScore = 0;
let oScore = 0;
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');



startGame();



function startGame() {
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true });
    });

    circleTurn = true;

    setScoreboard();
    setBoardHoverClass();
}

function setScoreboard() {
    document.getElementById('x-score').innerText = `× ${xScore}`;
    document.getElementById('o-score').innerText = `o ${oScore}`;
}

restartButton.addEventListener('click', restartGame);
winningMessageElement.addEventListener('click', nextRound);

function restartGame() {
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
    });
    winningMessageElement.classList.remove('show');
    xScore = oScore = 0;
    startGame();
   
}

function nextRound() {
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
    });
    winningMessageElement.classList.remove('show');
    startGame();
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

    placeMark(cell, currentClass);

    if(checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass()
    }

}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'DRAW!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "o" : "×"}`
        updateScoreboard(circleTurn);
    }

    winningMessageElement.classList.add('show');

}

function updateScoreboard(circleTurn) {
    if (circleTurn) oScore++; else xScore++;
    setScoreboard();
}

function isDraw() {
    return [...cellElements].every(cell => {
      return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if(circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }

}

function checkWin(currentClass) {
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}