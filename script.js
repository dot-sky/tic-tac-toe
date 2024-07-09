function gameBoard() {
  const rows = 3;
  const cols = 3;
  let board = [];
  let placedMarks = 0;

  const newBoard = () => {
    board = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(cell());
      }
      board.push(row);
    }
  };
  const printBoard = () => {
    console.log("----------");
    for (let i = 0; i < rows; i++) {
      let formattedRow = "";
      for (let j = 0; j < cols; j++) {
        formattedRow += board[i][j].getMarker() + " | ";
      }
      console.log(formattedRow);
      console.log("----------");
    }
  };
  const placeMark = (row, col, player) => {
    if (validMove(row, col) && allowedMove(row, col)) {
      board[row][col].setMarker(player.getMarker());
      placedMarks++;
      return true;
    }
    return false;
  };
  const allowedMove = (row, col) => board[row][col].isFree();
  const validMove = (row, col) => {
    return row < rows && row >= 0 && col < cols && col >= 0;
  };
  const getBoard = () => board;
  const allEqual = (arr) => {
    const first = arr[0];
    for (const cell of arr) {
      if (cell.getMarker() !== first.getMarker()) return false;
    }
    return true;
  };
  const checkState = () => {
    // check rows
    for (let i = 0; i < rows; i++) {
      const row = board[i];
      if (!row[0].isFree() && allEqual(row)) {
        return { state: "win", cell: row[0], index: i, type: "row" };
      }
    }
    // check cols
    for (let i = 0; i < cols; i++) {
      const col = [];
      for (let j = 0; j < rows; j++) {
        col.push(board[j][i]);
      }
      if (!col[0].isFree() && allEqual(col)) {
        return { state: "win", cell: col[0], index: i, type: "row" };
      }
    }
    // check diag
    const mainDiag = [];
    for (let i = 0; i < rows; i++) {
      mainDiag.push(board[i][i]);
    }
    if (!mainDiag[0].isFree() && allEqual(mainDiag)) {
      return { state: "win", cell: mainDiag[0], index: 0, type: "mainDiag" };
    }
    const secondDiag = [];
    for (let i = 0; i < rows; i++) {
      secondDiag.push(board[i][cols - i - 1]);
    }
    if (!secondDiag[0].isFree() && allEqual(secondDiag)) {
      return {
        state: "win",
        cell: secondDiag[0],
        index: 0,
        type: "secondDiag",
      };
    }
    if (placedMarks == rows * cols) {
      return { state: "draw" };
    }
    return { state: "none" };
  };
  newBoard();
  return { getBoard, newBoard, printBoard, placeMark, checkState };
}

function cell() {
  let marker = ".";
  const getMarker = () => marker;
  const setMarker = (newMarker) => (marker = newMarker);
  const isFree = () => marker === ".";
  return { getMarker, setMarker, isFree };
}
function createPlayer(playerName, playerMarker) {
  let name = playerName;
  let marker = playerMarker;
  const setName = (newName) => (name = newName);
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, setName, getMarker };
}
function gameController() {
  const playerOne = createPlayer("player1", "O");
  const playerTwo = createPlayer("player2", "X");
  const player = [playerOne, playerTwo];
  const game = gameBoard();
  let currentPlayer = playerOne;
  let finished = 0;
  const playMove = (row, col) => {
    console.log(
      `${currentPlayer.getName()} makes a move in: (${row}, ${col}) (row, column)`
    );
    if (game.placeMark(row, col, currentPlayer)) {
      game.printBoard();
      checkWinner();
      switchPlayer(currentPlayer);
    } else {
      console.log("Invalid move, choose another cell");
    }
  };
  const playTurn = (row, col) => {
    if (finished) {
      console.log("Game has already finished");
      return;
    }
    playMove(row, col);
  };
  const checkWinner = () => {
    const gameState = game.checkState();
    if (gameState.state === "win") {
      const winnerPlayer = findPlayer(gameState.cell.getMarker());
      console.log(`${winnerPlayer.getName()} has won`);
      finished = 1;
    } else if (gameState.state === "draw") {
      console.log(`The game has come to a draw`);
      finished = 1;
    }
  };
  const switchPlayer = (current) => {
    currentPlayer = current === player[0] ? player[1] : player[0];
  };
  const restartGame = () => {
    switchPlayer(player[0]);
    game.newBoard();
    finished = 0;
  };
  const findPlayer = (marker) => {
    for (const pl of player) {
      if (pl.getMarker() === marker) return pl;
    }
    return null;
  };
  game.printBoard();
  return { game, playTurn, restartGame };
}
const board = gameController();
// board.playTurn(2, 2);
// board.playTurn(2, 0);
// board.playTurn(0, 0);
// board.playTurn(1, 1);
// board.playTurn(0, 1);
// board.playTurn(0, 2);
// board.playTurn(2, 1);
// board.restartGame();

// board.playTurn(0, 0);
// board.playTurn(0, 1);
// board.playTurn(1, 0);
// board.playTurn(1, 2);
// board.playTurn(2, 2);
// board.playTurn(2, 0);
// board.playTurn(2, 1);
// board.playTurn(1, 1);
// board.playTurn(0, 2);
// board.playTurn(0, 0);
