const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
const resultScreen = document.getElementById('resultScreen');
const newGameButton = document.getElementById('newGame');
const playerTurn = document.getElementById('playerTurn');
let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];


const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));


    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }


    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;


    checkResult();
};


const checkResult = () => {
    let roundWon = false;


    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }


    if (roundWon) {
        message.innerText = `${currentPlayer} has won!`;
        gameActive = false;
        resultScreen.style.display = 'flex';
        return;
    }


    if (!boardState.includes('')) {
        message.innerText = `It's a tie!`;
        gameActive = false;
        resultScreen.style.display = 'flex';
        return;
    }


    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerTurn.innerText = `PLAYER ${currentPlayer}'s TURN`;
};


const restartGame = () => {
    currentPlayer = 'X';
    gameActive = true;
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.innerText = '');
    resultScreen.style.display = 'none';
    message.innerText = '';
    playerTurn.innerText = `PLAYER ${currentPlayer}'s TURN`;
};


const newGame = () => {
    restartGame();
    resultScreen.style.display = 'none';
};


cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
newGameButton.addEventListener('click', newGame);