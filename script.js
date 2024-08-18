let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let gameMode = 'local'; // 'local' or 'online'
let roomID = '';

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
const modeSelection = document.getElementById('modeSelection');
const roomManagement = document.getElementById('roomManagement');
const joinRoomContainer = document.getElementById('joinRoomContainer');
const roomIDContainer = document.getElementById('roomIDContainer');
const roomIDDisplay = document.getElementById('roomID');
const roomIDInput = document.getElementById('roomIDInput');
const joinRoomBtn = document.getElementById('joinRoomBtn');
const createRoomButton = document.getElementById('createRoom');
const joinRoomButton = document.getElementById('joinRoom');
let isMusicPlaying = false;

function handleCellClick(event) {
    if (gameMode === 'online') return; // Disable clicks in online mode for now

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
    if (gameMode === 'online') return; // Disable restart in online mode for now

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

function showModeSelection() {
    modeSelection.style.display = 'flex';
    document.getElementById('gameContainer').style.display = 'none';
}

function showRoomManagement() {
    roomManagement.style.display = 'flex';
    modeSelection.style.display = 'none';
}

function createRoom() {
    roomID = Math.floor(1000 + Math.random() * 9000).toString();
    roomIDDisplay.textContent = roomID;
    roomIDContainer.style.display = 'flex';
    joinRoomContainer.style.display = 'none';
    document.getElementById('gameContainer').style.display = 'flex';
    gameMode = 'online';
    restartGame();
}

function joinRoom() {
    roomID = roomIDInput.value;
    if (roomID.length === 4) {
        roomIDDisplay.textContent = roomID;
        roomIDContainer.style.display = 'flex';
        joinRoomContainer.style.display = 'none';
        document.getElementById('gameContainer').style.display = 'flex';
        gameMode = 'online';
        restartGame();
    } else {
        alert('Please enter a valid 4-digit Room ID.');
    }
}

document.getElementById('localMode').addEventListener('click', () => {
    modeSelection.style.display = 'none';
    document.getElementById('gameContainer').style.display = 'flex';
    gameMode = 'local';
});

document.getElementById('playWithFriend').addEventListener('click', showRoomManagement);
createRoomButton.addEventListener('click', createRoom);
joinRoomBtn.addEventListener('click', joinRoom);
joinRoomButton.addEventListener('click', () => {
    joinRoomContainer.style.display = 'flex';
    roomManagement.style.display = 'none';
});

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
newGameButton.addEventListener('click', restartGame);
musicToggle.addEventListener('click', toggleMusic);

// Start background music initially if required
backgroundMusic.play();
isMusicPlaying = true;
musicToggle.src = 'sound-on.png';
