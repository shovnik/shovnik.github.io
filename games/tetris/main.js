let arena;
let player;

// Redraws canvas
function draw() {
  // Frame
  fill(FRAME_COLOUR);
  rect(0, 0, width, height);

  //Background
  fill(BACKGROUND_COLOUR);
  rect(SCALE, SCALE*3, SCALE*4, SCALE*4);
  for (let i = 0; i < 3; i++) {
    rect(SCALE*(COLUMNS + 7), SCALE*(3 + i*5), SCALE*4, SCALE*4);
  }

  // Text
  fill(TEXT_COLOUR);
  textSize(SCALE/2);
  text("Stored: ", SCALE*2, SCALE*2.5);
  text("Upcoming: ", SCALE*(COLUMNS + 8.5), SCALE*2.5);
  textSize(SCALE*2/3);
  text("Level: " + player.level, SCALE*2.5, SCALE*12);
  text("Score: " + player.score, SCALE*2.5, SCALE*14);

  arena.display();
  player.display();
  player.update();
}

// Interacts with key press
function keyPressed() {
  switch (keyCode) {
    case INSTANT_DROP:
      return player.instantDrop();
    case ROTATE_CLOCKWISE:
      return player.block.rotate(CLOCKWISE);
    case ROTATE_ANTICLOCKWISE:
      return player.block.rotate(ANTICLOCKWISE);
    case STORE:
      return player.store();
  }
}

// Interacts with key release
function keyReleased() {
  player.resetKeyTimer(keyCode);
}

// Creates new game of tetris
function newGame() {
  arena = new Arena();
  player = new Player(3, 0);
  player.newBlock();
  player.update();
}

// Disables default behaviour of control keys
function preventDefault() {
  document.onkeydown = function(event) {
    const key = event.charCode || event.keyCode;
    if (key === SHIFT_LEFT || key === SHIFT_RIGHT || key === DROP ||
     key === INSTANT_DROP  || key === ROTATE_CLOCKWISE ||
      key === ROTATE_ANTICLOCKWISE || key === STORE) {
      event.preventDefault();
    }
  };
}

// Initial setup
function setup() {
  const canvas = createCanvas(SCALE*(COLUMNS + 12) + 1, SCALE*ROWS + 1);
  canvas.parent('canvas');
  preventDefault();
  frameRate(FRAMERATE);
  textAlign(CENTER, CENTER);
  newGame();
}
