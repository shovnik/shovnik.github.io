// Updates canvas to new game state
function redrawCanvas() {
  fill(BACKGROUND_COLOUR);
  rect(0, 0, width, height);
  board.display();
}

// Interacts with keypresses
function keyPressed() {
  board.slide(keyCode);
  if (board.full()) {
    newGame();
    show(LOSS);
  }
  else {
    board.randomSpawn();
    redrawCanvas();
    show(NEUTRAL);
  }
}

// Creates new game of 2048
function newGame() {
  board = new Board();
  board.randomSpawn();
  redrawCanvas();
}

// Initial setup
function setup() {
  createCanvas(LENGTH, LENGTH + SCALE/2);
  stroke(EDGE_COLOUR);
  strokeWeight(SCALE/32);
  textAlign(CENTER, CENTER);
  textSize(SCALE/2);
  newGame();
  show(NEUTRAL);
}

// Shows given message below board
function show(message) {
  fill(TEXT_COLOUR);
  text(message, LENGTH/2, LENGTH + SCALE/4);
}
