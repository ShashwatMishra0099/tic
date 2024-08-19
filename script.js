let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
const playerTurnText = document.getElementById('playerTurn');
const resultScreen = document.getElementById('resultScreen');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
const cells = document.querySelectorAll('.cell');
const roomIdDisplay = document.getElementById('roomIdDisplay');
const menuScreen = document.getElementById('menuScreen');
const roomManagementScreen = document.getElementById('roomManagementScreen');
const gameScreen = document.getElementById('gameScreen');
const localModeButton = document.getElementById('localMode');
const playWithFriendButton = document.getElementById('playWithFriend');
const createRoomButton = document.getElementById('createRoom');
const joinRoomButton = document.getElementById('joinRoom');
const roomIdInput = document.getElementById('roomIdInput');

// Initial Screen Setup
menuScreen.style.display = 'flex';

localModeButton.addEventListener('click', () => {
    menuScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
});

playWithFriendButton.addEventListener('click', () => {
    menuScreen.style.display = 'none';
    roomManagementScreen.style.display = 'flex';
});

createRoomButton.addEventListener('click', () => {
    const roomId = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit Room ID
    roomIdDisplay.textContent = `Room ID: ${roomId}`;
    roomManagementScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
});

joinRoomButton.addEventListener('click', () => {
    const enteredRoomId = roomIdInput.value.trim();
    if (enteredRoomId !== '') {
        roomIdDisplay.textContent = `Joined Room: ${enteredRoomId}`;
        roomManagementScreen.style.display = 'none';
        gameScreen.style.display = 'flex';
    }
});

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');
    if (board[index] !== '' || !gameActive) {
        return;
    }
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        showResultScreen(`${currentPlayer} Wins!`);
    } else if (board.every(cell => cell !== '')) {
        gameActive = false;
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
        cell.textContent = '';
    });
    playerTurnText.textContent = `PLAYER ${currentPlayer}'s TURN`;
    resultScreen.style.display = 'none';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
