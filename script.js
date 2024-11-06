const gameBoard = document.getElementById("game-board");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];

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

gameBoard.addEventListener("click", (e) => {
    const cell = e.target;
    const index = cell.getAttribute("data-index");

    if (cell.classList.contains("cell") && board[index] === "") {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        if (checkWin()) {
            statusText.textContent = `${currentPlayer} wins!`;
            disableBoard();
        } else if (board.every(cell => cell !== "")) {
            statusText.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = `${currentPlayer}'s turn`;
        }
    }
});

restartButton.addEventListener("click", restartGame);

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function disableBoard() {
    gameBoard.style.pointerEvents = "none";
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    statusText.textContent = `${currentPlayer}'s turn`;
    gameBoard.style.pointerEvents = "auto";
    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
    });
}
