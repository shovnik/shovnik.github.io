let food;
let inputPressed = false;

// Redraws canvas
function draw() {
  // Frame
  fill(FRAME_COLOUR);
  rect(0, 0, width - 1, height - 1);

  // Background
  fill(BACKGROUND_COLOUR);
  rect(0, 0, SCALE*WIDTH, SCALE*HEIGHT);

  // Score
  fill(TEXT_COLOUR);
  text("Score: " + snake.score, SCALE*(WIDTH / 2), SCALE*(HEIGHT + 1));
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
  snake = new Snake(SCALE*WIDTH/2, SCALE*HEIGHT/2);
  food = new Food();
}

// Initial setup
function setup() {
  const canvas = createCanvas(SCALE*WIDTH + 1, SCALE*(HEIGHT + 2) + 1);
  canvas.parent('canvas');
  frameRate(120);
  textAlign(CENTER, CENTER);
  textSize(SCALE);
  newGame();
}
