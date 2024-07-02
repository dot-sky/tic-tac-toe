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
  newBoard();
  return { getBoard, newBoard, printBoard, playMove };
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
  let currentPlayer = playerOne;
  const game = gameBoard();
  const playTurn = (row, col) => {
    console.log(
      `${currentPlayer.getName()} makes a move in: (${row}, ${col}) (row, column)`
    );
    if (game.playMove(row, col, currentPlayer)) {
      game.printBoard();
      switchPlayer(currentPlayer);
    } else {
      console.log("Invalid move, choose another cell");
    }
  };
  const switchPlayer = (current) => {
    currentPlayer = current === player[0] ? player[1] : player[0];
  };
  game.printBoard();
  return { game, playTurn };
}
const board = gameController();
