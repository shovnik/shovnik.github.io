let minefield;
let smiley;
let timer = 0;

// Redraws canvas
function draw() {
  // Top Panel
  fill(MINEFIELD_COLOUR);
  rect(SCALE/4, SCALE/4, SCALE*(COLUMNS + 1/2) - SCALE/2  - 1, SCALE*7/4);

  // Timer
  fill(TEXT_COLOUR);
  textSize(SCALE*9/16);
  text(timer, SCALE*3, SCALE*9/8);

  minefield.display();
  smiley.display();
}

// Interacts with release of mouse button
function mouseReleased() {
  if (smiley.contains(mouseX, mouseY)) {
    return newGame();
  }
  if (minefield.contains(mouseX, mouseY)) {
    minefield.click(mouseButton);
  }
}

// Creates new game of minesweeper
function newGame () {
  minefield = new Minefield;
  smiley = new Smiley;
  timer = 0;
}

// Initial setup
function setup() {
  // Disables right click context menu
  document.addEventListener('contextmenu', event => event.preventDefault());

  createCanvas(SCALE*COLUMNS + X_OFFSET*2, SCALE*ROWS + Y_OFFSET*10/9);
  textAlign(CENTER, CENTER);
  background(BACKGROUND_COLOUR);
  setInterval(updateTimer, 1000);
  newGame();
}

// Increments timer
function updateTimer() {
  if (minefield.gameState === IN_PROGRESS) {
    timer++;
  }
}
