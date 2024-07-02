function gameBoard() {
  const rows = 3;
  const cols = 3;
  const board = [];

  const newBoard = () => {
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
  const playMove = (row, col, player) => {
    if (validMove(row, col) && allowedMove(row, col)) {
      board[row][col].setMarker(player.getMarker());
      return true;
    }
    return false;
  };
  const allowedMove = (row, col) => board[row][col].isFree();
  const validMove = (row, col) => {
    return row < rows && row >= 0 && col < cols && col >= 0;
  };
  const getBoard = () => board;
  const checkWin = () => {
    for (let i = 0; i < rows; i++) {
      const firstCell = board[i][0];
      let equalCells = 1;
      for (let j = 1; j < cols; j++) {
        if (
          !firstCell.isFree() &&
          firstCell.getMarker() === board[i][j].getMarker()
        ) {
          equalCells++;
        } else {
          break;
        }
      }
      if (equalCells >= rows) {
        return { cell: firstCell, index: i, type: "row" };
      }
    }
    for (let i = 0; i < cols; i++) {
      const firstCell = board[0][i];
      let equalCells = 1;
      for (let j = 1; j < rows; j++) {
        if (
          !firstCell.isFree() &&
          firstCell.getMarker() === board[j][i].getMarker()
        ) {
          equalCells++;
        } else {
          break;
        }
      }
      if (equalCells >= cols) {
        return { cell: firstCell, index: i, type: "col" };
      }
    }
    for (let i = 0; i < rows; i += 2) {
      let firstCell = board[0][0];
      let equalCells = 1;
      for (let j = 1; j < rows; j++) {
        if (
          !firstCell.isFree() &&
          firstCell.getMarker() === board[j][j].getMarker()
        ) {
          equalCells++;
        } else {
          break;
        }
      }
      if (equalCells >= cols) {
        return { cell: firstCell, index: i, type: "diag" };
      }
      firstCell = board[0][cols - 1];
      equalCells = 1;
      for (let j = 1; j < cols; j++) {
        if (
          !firstCell.isFree() &&
          firstCell.getMarker() === board[j][cols - j - 1].getMarker()
        ) {
          equalCells++;
        } else {
          break;
        }
      }
      if (equalCells >= cols) {
        return { cell: firstCell, index: i, type: "diag" };
      }
    }
    return { cell: null, index: -1, type: "none" };
  };
  newBoard();
  return { getBoard, newBoard, printBoard, playMove, checkWin };
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
  const playTurn = (row, col) => {
    if (finished) {
      console.log("Game has already finished");
      return;
    }
    console.log(
      `${currentPlayer.getName()} makes a move in: (${row}, ${col}) (row, column)`
    );
    if (game.playMove(row, col, currentPlayer)) {
      game.printBoard();
      checkWinner();
      switchPlayer(currentPlayer);
    } else {
      console.log("Invalid move, choose another cell");
    }
  };
  const checkWinner = () => {
    const checkWin = game.checkWin();
    if (checkWin.type !== "none") {
      console.log(checkWin);
      console.log(`player with marker ${checkWin.cell.getMarker()} has won`);
      finished = 1;
    }
  };
  const switchPlayer = (current) => {
    currentPlayer = current === player[0] ? player[1] : player[0];
  };
  game.printBoard();
  return { game, playTurn };
}
const board = gameController();
board.playTurn(2, 0);
board.playTurn(0, 0);
board.playTurn(1, 1);
board.playTurn(0, 1);
board.playTurn(0, 2);
// board.playTurn(2, 1);
// board.playTurn(2, 0);
// board.playTurn(0, 2);
// board.playTurn(2, 2);
