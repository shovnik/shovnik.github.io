let food;
let inputPressed = false;

// Redraws canvas
function draw() {
  // Frame
  fill(FRAME_COLOUR);
  rect(0, 0, width - 1, height - 1);

  // Background
  fill(BACKGROUND_COLOUR);
  rect(0, 0, SCALE*20, SCALE*20);

  // Score
  fill(TEXT_COLOUR);
  text("Score: " + snake.score, SCALE*10, SCALE*21);
  snake.update();

  snake.display();
  food.display();
}

// Interacts with keypresses
function keyPressed() {
  if (inputPressed === false) {
    snake.turn(keyCode);
  }
  snake.turnCounter = 1;
  inputPressed = true;
}

// Creates new game of snake
function newGame() {
  snake = new Snake(SCALE*10, SCALE*10);
  food = new Food();
}

// Initial setup
function setup() {
  createCanvas(SCALE*20 + 1, SCALE*22 + 1);
  frameRate(120);
  textAlign(CENTER, CENTER);
  textSize(SCALE);
  newGame();
}
