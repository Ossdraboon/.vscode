

const playerRed = "R";
const playerYellow = "Y";
let currPlayer = playerRed;

let gameOver = false;
let board;

const rows = 6;
const columns = 7;
let currColumns = []; //keeps track of which row each column is at.

let gameTime = 0;

let playerRedCounter = 0;
let playerYellowCounter = 0;

window.onload = function () {
  setGame();
  displayCounters();
  displayHighScores();
}


function updateHighScore(board, r, c) {
  let highScores = JSON.parse(localStorage.getItem("highScores")) || { "R": null, "Y": null };
  let winner = board[r][c];
  let moves = winner === playerRed ? playerRedCounter : playerYellowCounter;
  console.log("Winner: " + winner);
  console.log("Moves: " + moves);
  console.log("High Scores: " + highScores);
  console.log("High Score: " + highScores[winner]);

  if (highScores[winner] === null || moves < highScores[winner]) {
    highScores[winner] = moves;
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
}

function displayHighScores() {
  let highScores = JSON.parse(localStorage.getItem("highScores")) || { "R": null, "Y": null };
  let redHighScore = document.getElementById("redHighScore");
  let yellowHighScore = document.getElementById("yellowHighScore");
  redHighScore.innerText = `Red High Score: ${highScores["R"] !== null ? highScores["R"] : "N/A"}`;
  yellowHighScore.innerText = `Yellow High Score: ${highScores["Y"] !== null ? highScores["Y"] : "N/A"}`;
}





function updateMoveCounter() {
  updateCounters();
  displayCounters();
}

function resetCounters() {
  playerRedCounter = 0;
  playerYellowCounter = 0;
}

function updateCounters() {
  if (currPlayer == playerRed) {
    playerRedCounter++;
  } else {
    playerYellowCounter++;
  }
  console.log("player red counter = " + playerRedCounter);
  console.log("player yellow counter = " + playerYellowCounter);
}

function displayCounters() {
  let redCounter = document.getElementById("redCounter");
  let yellowCounter = document.getElementById("yellowCounter");
  redCounter.innerText = `Red: ${playerRedCounter}`;
  yellowCounter.innerText = `Yellow: ${playerYellowCounter}`;
}


function setGame() {
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      // JS
      row.push(' ');
      // HTML
      showPlayer(currPlayer);
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("board").append(tile);
    }
    board.push(row);
  }
}

function setPiece() {
  if (gameOver) {
    return;
  }

  //get coords of that tile clicked
  let coords = this.id.split("-");
  console.log(coords);
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  // figure out which row the current column should be on
  r = currColumns[c];

  if (r < 0) { // board[r][c] != ' '
    alert("Invalid move, this column is full");
    return;
  }

  board[r][c] = currPlayer; //update JS board
  let tile = document.getElementById(r.toString() + "-" + c.toString());

  if (currPlayer == playerRed) {
    tile.classList.add("red-piece");
    updateMoveCounter();
    currPlayer = playerYellow;
  }
  else {
    tile.classList.add("yellow-piece");
    updateMoveCounter();
    currPlayer = playerRed;
  }

  r -= 1; //update the row height for that column
  currColumns[c] = r; //update the array

  checkWinner();
  if (!gameOver) {
    showPlayer(currPlayer);
  } else {
    let player = document.getElementById("player");
    player.innerText = "";
  }

}

function checkWinner() {
  // horizontal
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      // doppelschleife um durch die 2D array zu gehen, row 0 und column 0 sind der start, da wir 4 in einer reihe brauchen reduzieren wir die columns um 3, damit wir nicht out of bounds gehen. Von da aus gehen wir durch die columns und schauen ob die 4 in einer reihe sind. Erst wird 0-0 mit 0-1 verglichen ob sie gleich sind, dann 0-1 mit 0-2 und so weiter. Wenn sie gleich sind, dann haben wir einen winner.
      if (board[r][c] != ' ') {
        if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
          //Die funktion setWinner ermittelt mit hilfe der koordinaten, wer gewonnen hat. Ist in row und column wo wir die 4 in einer reihe gefunden haben die Farbe Rot vorhanden, so wird Spieler Rot als Gewinner ermittelt.
          setWinner(r, c);
          //return beendet die funktion, bei einem gewinner brauchen wir nicht weiter zu suchen.
          return;
        }
      }
    }
  }

  // vertical
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (board[r][c] != ' ') {
        if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // anti diagonal
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != ' ') {
        if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3]) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // diagonal
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != ' ') {
        if (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3]) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
}

function showPlayer(currentplayer) {
  let player = document.getElementById("player");
  if (currentplayer == playerRed) {
    player.innerText = "Red's Turn";
  } else {
    player.innerText = "Yellow's Turn";
  }
}

function setWinner(r, c) {
  let winner = document.getElementById("winner");
  if (board[r][c] == playerRed) {
    //updateHighScore();
    winner.innerText = "Red Wins";
  } else {
    // updateHighScore();
    winner.innerText = "Yellow Wins";
  }
  gameOver = true;
  updateHighScore(board, r, c);
  console.log("Highscore....");
}

function resetGame() {
  // Clear the board
  let boardElement = document.getElementById("board");
  while (boardElement.firstChild) {
    boardElement.removeChild(boardElement.firstChild);
  }

  // Reset game variables
  gameOver = false;
  currPlayer = playerRed;
  resetCounters();

  // Set up the game again
  setGame();
  displayCounters();
  displayHighScores();
  showPlayer(currPlayer);

  // Clear winner text
  let winner = document.getElementById("winner");
  winner.innerText = "";
}

// Add event listener to reset button
document.getElementById("resetButton").addEventListener("click", resetGame);