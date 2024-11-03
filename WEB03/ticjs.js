const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click
function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    // Ignore click if cell is already filled or game is over
    if (gameState[cellIndex] || checkWinner()) return;

    // Update game state and UI
    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check for a winner or a tie
    if (checkWinner()) {
        message.textContent = `${currentPlayer} wins!`;
    } else if (gameState.every(cell => cell !== null)) {
        message.textContent = "It's a tie!";
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Check for a winning combination
function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}

// Reset the game
function resetGame() {
    gameState.fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// Initialize message
message.textContent = `Player ${currentPlayer}'s turn`;
