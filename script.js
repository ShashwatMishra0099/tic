let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let gameMode = 'local'; // 'local' or 'online'
let roomID = '';
let currentRoomID = '';

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
const gameContainer = document.getElementById('gameContainer');
const roomIDContainer = document.getElementById('roomIDContainer');
const roomIDDisplay = document.getElementById('roomID');

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
    roomIDContainer.style.display = 'none'; // Hide room ID display
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

function startLocalGame() {
    modeSelection.style.display = 'none';
    gameContainer.style.display = 'block';
    restartGame(); // Initialize game
}

function showRoomManagement() {
    modeSelection.style.display = 'none';
    roomManagement.style.display = 'flex';
}

function createRoom() {
    currentRoomID = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
    roomIDDisplay.textContent = currentRoomID;
    roomIDContainer.style.display = 'flex'; // Show room ID display
    roomManagement.style.display = 'none';
    gameContainer.style.display = 'block';
    restartGame(); // Initialize game
}

function joinRoom() {
    currentRoomID = document.getElementById('roomIDInput').value;
    if (currentRoomID) {
        // Logic to join the room
        roomManagement.style.display = 'none';
        gameContainer.style.display = 'block';
        restartGame(); // Initialize game
    } else {
        alert('Please enter a Room ID');
    }
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
newGameButton.addEventListener('click', restartGame);
musicToggle.addEventListener('click', toggleMusic);

document.getElementById('localMode').addEventListener('click', startLocalGame);
document.getElementById('playWithFriend').addEventListener('click', showRoomManagement);
document.getElementById('createRoom').addEventListener('click', createRoom);
document.getElementById('joinRoomBtn').addEventListener('click', joinRoom);

// Start background music initially if required
backgroundMusic.play();
isMusicPlaying = true;
musicToggle.src = 'sound-on.png';
