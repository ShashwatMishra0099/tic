document.addEventListener('DOMContentLoaded', () => {
    const localModeButton = document.getElementById('localModeButton');
    const playWithFriendButton = document.getElementById('playWithFriendButton');
    const modeSelection = document.querySelector('.mode-selection');
    const roomManagement = document.querySelector('.room-management');
    const createRoomButton = document.getElementById('createRoomButton');
    const joinRoomButton = document.getElementById('joinRoomButton');
    const roomIDInput = document.getElementById('roomIDInput');
    const roomIDContainer = document.getElementById('roomIDContainer');
    const roomIDDisplay = document.createElement('div');
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const playerTurnDisplay = document.querySelector('.player-turn');
    const resultScreen = document.querySelector('.result-screen');
    const resultMessage = document.querySelector('.message');
    const newGameButton = document.getElementById('newGame');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    
    // Initialize game
    function initializeGame() {
        gameState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winning-cell');
        });
        playerTurnDisplay.textContent = `Player ${currentPlayer}'s turn`;
        resultScreen.style.display = 'none';
    }

    // Handle cell click
    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        checkResult();
    }

    // Check the result of the game
    function checkResult() {
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

        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            gameActive = false;
            resultMessage.textContent = `Player ${currentPlayer} has won!`;
            resultScreen.style.display = 'flex';
            return;
        }

        const roundDraw = !gameState.includes('');
        if (roundDraw) {
            gameActive = false;
            resultMessage.textContent = 'Game ended in a draw!';
            resultScreen.style.display = 'flex';
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerTurnDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }

    // Event listeners for cell clicks
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));

    // Event listener for new game button
    newGameButton.addEventListener('click', initializeGame);

    // Room ID Display Setup
    roomIDDisplay.id = 'roomIDDisplay';
    roomIDDisplay.style.color = 'pink';
    roomIDContainer.appendChild(roomIDDisplay);

    // Handle Local Mode Button click
    localModeButton.addEventListener('click', () => {
        modeSelection.style.display = 'none';
        initializeGame();
    });

    // Handle Play with Friend Button click
    playWithFriendButton.addEventListener('click', () => {
        modeSelection.style.display = 'none';
        roomManagement.style.display = 'block';
    });

    // Handle Create Room Button click
    createRoomButton.addEventListener('click', () => {
        const roomID = generateRoomID();
        roomIDDisplay.textContent = `Room ID: ${roomID}`;
        roomIDContainer.style.display = 'block';
        roomManagement.style.display = 'none';
        initializeGame();
    });

    // Handle Join Room Button click
    joinRoomButton.addEventListener('click', () => {
        const roomID = roomIDInput.value.trim();
        if (roomID) {
            roomIDDisplay.textContent = `Room ID: ${roomID}`;
            roomIDContainer.style.display = 'block';
            roomManagement.style.display = 'none';
            initializeGame();
        } else {
            alert('Please enter a valid Room ID.');
        }
    });

    // Function to generate a unique 6-digit Room ID
    function generateRoomID() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
});
