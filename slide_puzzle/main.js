let board;
let missingSquareX;
let missingSquareY;
let currentTime;

// Redraws canvas
function draw() {
  // Frame
  fill(BACKGROUND_COLOUR);
  rect(0, 0, width, height - SCALE/2);

  // Missing tile
  fill(MISSING_TILE_COLOUR);
  rect(0, height - SCALE/2 - 1, width - 1, SCALE/2);

  // Timer
  fill(TEXT_COLOUR)
  textSize(SCALE/4);
  text(currentTime, SCALE*COLUMNS/2, SCALE*(ROWS + 1/4));

  board.display();
}

// Interacts with press of mouse button
function mousePressed() {
  if (board.solved) {
    newGame();
  }
  board.click(mouseX, mouseY);
}

// Creates new slide puzzle
function newGame() {
  board = new Board;
  currentTime = 0;
}

// Initial setup
function setup() {
  createCanvas(SCALE*COLUMNS + 1, SCALE*(ROWS + 1/2) + 1);
  textAlign(CENTER, CENTER);
  setInterval(updateTime, 1000);
  newGame();
}

// Updates timer
function updateTime() {
  if (!board.solved) {
    currentTime++;
  }
}
