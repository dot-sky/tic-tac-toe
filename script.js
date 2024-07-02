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
    for (let i = 0; i < rows; i++) {
      let formattedRow = "";
      console.log("----------");
      for (let j = 0; j < cols; j++) {
        formattedRow += board[i][j].getMarker() + " | ";
      }
      console.log(formattedRow);
      console.log("----------");
    }
    console.log("");
  };
  const playMove = (row, col, player) => {
    if (allowedMove(row, col)) {
      board[row][col].setMarker(player.getMarker());
    }
  };
  const allowedMove = (row, col) => {
    return board[row][col].isFree();
  };
  newBoard();
  return { newBoard, printBoard, playMove };
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
  console.log(playerOne);
  const game = gameBoard();
  game.printBoard();
  game.playMove(0, 1, playerOne);
  game.printBoard();
  game.playMove(1, 1, playerTwo);
  game.printBoard();
  return { game };
}
const board = gameController();
