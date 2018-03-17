var c = 10; //columns
var r = 20; //rows
var d = 40; //scale
var fps = 60; //framerate
var score;
var blockCounter; //counts blocks spawned so far in game

//redraws canvas
function draw() {
  fill('Gray');
  rect(0, 0, width, height);
  fill('Black');
  rect(d, d * 3, d * 4, d * 4);
  for (let i = 0; i < 3; i++) {
    rect(d * (c + 7), d * (3 + i * 5), d * 4, d * 4);
  }
  arena.display();
  player.display();
  player.update();
  fill('Black');
  textSize(d / 2);
  text("Stored: ", d * 2, d * 2.5);
  text("Upcoming: ", d * (c + 8.5), d * 2.5);
  textSize(d * 2 / 3);
  text("Level: " + player.level, d * 2.5, d * 12);
  text("Score: " + score, d * 2.5, d * 14);
}

//speed landing and store keyboard functions
function keyPressed() {
  switch (keyCode) {
    case 16:
      if (!player.storageUsed) {
        player.store();
      }
      break;
    case 17:
      player.block.rotate(-1);
      if (player.collides()) {
        player.reposition(-1);
      }
      break;
    case 32:
      while (!player.lands()) {
        player.block.y++;
      }
      player.block.y--;
      player.dropTimer = fps;
      break;
    case 38:
      player.block.rotate(1);
      if (player.collides()) {
        player.reposition(1);
      }
      break;
  }
}

//resets all key timers upon key release
function keyReleased() {
  switch (keyCode) {
    case 40:
      player.downKeyTimer = 0;
      player.dropTimer = 0;
      break;
    case 37:
      player.leftKeyTimer = 0;
      break;
    case 39:
      player.rightKeyTimer = 0;
      break;
    case 38:
      player.upKeyTimer = 0;
      break;
    case 17:
      player.ctrlKeyTimer = 0;
      break;
  }
}

//initiates a new game of tetris
function newGame() {
  score = 0;
  arena = new Arena();
  player = new Player(3, 0);
  blockCounter = 0;
  player.newBlock();
  blockCounter = 1;
  player.update();
}

//selects colour of inner block
function setup() {
  const canvas = createCanvas(d * (c + 12) + 1, d * r + 1);
  canvas.parent('canvas');
  background(192);
  frameRate(fps);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  newGame();
}
