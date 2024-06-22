let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
const playerTurnText = document.getElementById('playerTurn');
const resultScreen = document.getElementById('resultScreen');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
const newGameButton = document.getElementById('newGame');
const cells = document.querySelectorAll('.cell');
const backgroundMusic = document.getElementById('backgroundMusic');
const victorySound = document.getElementById('victorySound');
const hitEffect = document.getElementById('hitEffect');
const musicToggle = document.getElementById('musicToggle');
let isMusicPlaying = false;

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');
    if (board[index] !== '' || !gameActive) {
        return;
    }
    board[index] = currentPlayer;
    cell.style.backgroundImage = `url(${currentPlayer}.png)`;
    hitEffect.play();

    if (checkWin()) {
        gameActive = false;
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        victorySound.play();
        showResultScreen(`${currentPlayer} Wins!`);
    } else if (board.every(cell => cell !== '')) {
        gameActive = false;
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        showResultScreen(`It's a Draw!`);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerTurnText.textContent = `PLAYER ${currentPlayer}'s TURN`;
    }
}

function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function showResultScreen(messageText) {
    message.textContent = messageText;
    resultScreen.style.display = 'flex';
}

function restartGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    cells.forEach(cell => {
        cell.style.backgroundImage = '';
    });
    playerTurnText.textContent = `PLAYER ${currentPlayer}'s TURN`;
    resultScreen.style.display = 'none';
    victorySound.pause();
    victorySound.currentTime = 0;
    if (isMusicPlaying) {
        backgroundMusic.play();
    }
}

function toggleMusic() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicToggle.src = 'no sound.png';
    } else {
        backgroundMusic.play();
        musicToggle.src = 'sound-on.png';
    }
    isMusicPlaying = !isMusicPlaying;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
newGameButton.addEventListener('click', restartGame);
musicToggle.addEventListener('click', toggleMusic);

// Start background music initially if required
backgroundMusic.play();
isMusicPlaying = true;
musicToggle.src = 'sound-on.png';
