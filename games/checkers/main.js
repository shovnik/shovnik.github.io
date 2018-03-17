const d = 500/6; //scale
const l = 8; //number of rows and columns
let board = [];
let turn = 1; //1 always means red and -1 always means black
let redWin = false;
let blackWin = false;
let selected = null;


//checks if a player has won the game
function checkWin() {
  let win = true;
  let i = 0;
  while (win && i < l) {
    let j = 0;
    while (win && j < l) {
      if (board[i][j].piece && board[i][j].piece.colour === turn) {
        win = false;
      }
      j++;
    }
    i++;
  }
  if (win) {
    if (turn === 1) {
      redWin = true;
    }
    else if (turn === - 1) {
      blackWin = true;
    }
  }
}

//redraws canvas
function draw() {
  fill(255);
  stroke(0);
  for (let i = 0; i < l; i++) {
    for (let j = 0; j < l; j++) {
      board[i][j].display();
    }
  }
  if (redWin || blackWin) {
    textAlign(CENTER, CENTER);
    textSize(d / 2);
    fill(0, 0, 255);
    if (redWin) {
      text('Red Wins!', d * l / 2, d * l / 2 - d / 3);
    }
    else {
      text('Black Wins!', d * l / 2, d * l / 2 - d / 3);
    }
    text('Click anywhere to restart', d * l / 2, d * l / 2 + d / 3);
  }
}

//mouse interaction
function mousePressed() {
  if (redWin || blackWin) {
    newGame();
  }
  for (let i = 0; i < l; i++) {
    for (let j = 0; j < l; j++) {
      board[i][j].selected = false;
      if (board[i][j].contains(mouseX, mouseY)) {
        if(board[i][j].piece && board[i][j].piece.colour === turn) {
          board[i][j].selected = true;
          selected = [i, j];
        }
        else if (selected) {
          move([i, j]);
        }
      }
    }
  }
}

//request to move selected piece to given location
function move(loc) {
  if (!board[loc[0]][loc[1]].piece) {
    moveHelper(loc, false);
    if (board[selected[0]][selected[1]].piece && board[selected[0]][selected[1]].piece.queen) {
      moveHelper(loc, true);
    }
  }
  selected = null;
}

//simplifies move code
function moveHelper(loc, queen) {
  let a;
  let b;
  if (!queen && turn === 1 || queen && turn === - 1) {
    a = loc;
    b = selected;
  }
  else {
    a = selected;
    b = loc;
  }
  if ((a[0] + 1 === b[0] && a[1] + 1 === b[1]) || (a[0] + 1 === b[0] && a[1] - 1 === b[1])) {
    playMove(loc);
  }
  else if (a[0] + 2 === b[0] && a[1] + 2 === b[1] && board[a[0] + 1][a[1] + 1].piece && board[a[0] + 1][a[1] + 1].piece.colour === turn * -1) {
    board[a[0] + 1][a[1] + 1].piece = null;
    checkWin();
    playMove(loc);
  }
  else if (a[0] + 2 === b[0] && a[1] - 2 === b[1] && board[a[0] + 1][a[1] - 1].piece && board[a[0] + 1][a[1] - 1].piece.colour === turn * -1) {
    board[a[0] + 1][a[1] - 1].piece = null;
    checkWin();
    playMove(loc, 1);
  }
}

//sets up a new game
function newGame() {
  for (let i = 0; i < l; i++) {
    board[i] = [];
    for (let j = 0; j < l; j++) {
      board[i][j] = new Cell(j, i);
      if ((i + j) % 2 && i < 3) {
        board[i][j].piece = new Piece(j, i, - 1, false);
      } else if ((i + j) % 2 && i > 4) {
        board[i][j].piece = new Piece(j, i, 1, false);
      }
    }
  }
  redWin = false;
  blackWin = false;
  turn = 1;
}

//plays requested move
function playMove(loc) {
  board[loc[0]][loc[1]].piece = new Piece(loc[1], loc[0], turn, board[selected[0]][selected[1]].piece.queen);
  board[selected[0]][selected[1]].piece = null;
  if ((loc[0] === 0 && board[loc[0]][loc[1]].piece.colour === 1) || (loc[0] === l - 1 && board[loc[0]][loc[1]].piece.colour === - 1)) {
    board[loc[0]][loc[1]].piece.queen = true;
  }
  turn *= -1;
}

//initial canvas setup
function setup() {
  const canvas = createCanvas(d * l + 1, d * l + 1);
  canvas.parent('canvas');
  newGame();
}
