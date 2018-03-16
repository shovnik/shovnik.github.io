//contructor for new players
function Player(spawnx, spawny) {
  this.x = spawnx;
  this.y = spawny;
  this.level = 1;
  this.bucket = [1, 2, 3, 4, 5, 6, 7];
  this.bucketIndex = 6;
  this.dropTimer = 0;
  this.maxDropTimer = fps;
  this.downKeyTimer = 0;
  this.leftKeyTimer = 0;
  this.rightKeyTimer = 0;
  this.typeStored = 0;
  this.storageUsed = false;
  this.nextTypeQueue = [0, 0, 0];
  for (let i = 0; i < this.nextTypeQueue.length; i++) {
    this.nextTypeQueue[i] = this.randomizer();
  }
  this.nextBlockQueue = [3];
}

//check collision for rotational movement or spawn
Player.prototype.collides = function () {
  for (let i = 0; i < this.block.matrixSize; i++) {
    for (let j = 0; j < this.block.matrixSize; j++) {
      if (this.block.matrix[j][i] != 0 && (this.block.x < 0 || this.block.x > c - 1 || this.block.y + j > r - 1 || arena.grid[this.block.y + j][this.block.x + i] != 0)) {
        return true;
      }
    }
  }
  return false;
}

//displays queued and stored blocks on canvas
Player.prototype.display = function () {
  for (let i = 0; i < this.nextTypeQueue.length; i++) {
    this.nextBlockQueue[i].display(0);
  }
  if (this.typeStored) {
    this.blockStored.display(0);
  }
  this.block.display(6);
}

//check collision for vertical movement
Player.prototype.lands = function () {
  for (let i = 0; i < this.block.matrixSize; i++) {
    for (let j = 0; j < this.block.matrixSize; j++) {
      if (this.block.matrix[j][i] != 0 && (this.block.y + j > r - 1 || arena.grid[this.block.y + j][this.block.x + i] != 0)) {
        return true;
      }
    }
  }
  return false;
}

//merge player block with arena
Player.prototype.merge = function () {
  for (let i = 0; i < this.block.matrixSize; i++) {
    for (let j = 0; j < this.block.matrixSize; j++) {
      if (this.block.matrix[j][i] != 0) {
        arena.grid[this.block.y + j][this.block.x + i] = this.block.matrix[j][i];
      }
    }
  }
}

//spawns a new block for player
Player.prototype.newBlock = function () {
  this.block = new Block (this.x, this.y, this.nextTypeQueue[0]);
  for (let i = 0; i < this.nextTypeQueue.length - 1; i++) {
    this.nextTypeQueue[i] = this.nextTypeQueue[i + 1];
  }
  this.nextTypeQueue[this.nextTypeQueue.length - 1] = this.randomizer();
  blockCounter++;
  for (let i = 0; i < this.nextTypeQueue.length; i++) {
    switch (this.nextTypeQueue[i]) {
      case 1:
      this.nextBlockQueue[i] = new Block(c + 7, 3.5 + i * 5, this.nextTypeQueue[i]);
        break;
      case 7:
      this.nextBlockQueue[i] = new Block(c + 8, 4 + i * 5, this.nextTypeQueue[i]);
        break;
      default:
      this.nextBlockQueue[i] = new Block(c + 7.5, 4 + i * 5, this.nextTypeQueue[i]);
    }
  }
  if (blockCounter % 7 == 6) {
    this.level++;
    this.maxDropTimer -= (fps / 3) / this.level;
  }
  if (this.collides()) {
    newGame();
  }
  this.storageUsed = false;
}

//functionality to keep a block in reserve
Player.prototype.store = function () {
  if (this.typeStored == 0) {
    this.typeStored = this.block.type;
    this.newBlock();
  }
  else {
    //swap
    var tmp = this.block.type;
    this.block = new Block (this.x, this.y, this.typeStored);
    this.typeStored = tmp;
  }
  switch (this.typeStored) {
    case 1:
    this.blockStored = new Block(1, 3.5, this.typeStored);
      break;
    case 7:
    this.blockStored = new Block(2, 4, this.typeStored);
      break;
    default:
    this.blockStored = new Block(1.5, 4, this.typeStored);
  }
  this.storageUsed = true;
}

//randomly generate block type based on tetris standard
Player.prototype.randomizer = function () {
  if (this.bucketIndex == 6) {
    //shuffle bucket
    for (let i = 6; i > 0; i--) {
      //swap
      j = floor(random(i));
      var tmp = this.bucket[i];
      this.bucket[i] = this.bucket[j];
      this.bucket[j] = tmp;
    }
    this.bucketIndex = 0;
  }
  else {
    this.bucketIndex++;
  }
  return this.bucket[this.bucketIndex];
}

//reposition block to position without collision
Player.prototype.reposition = function (dir) {
  var n = 1;
  var tmp = this.block.x;
  while(this.collides() && n < 5) {
    if (this.block.x % 2) {
      this.block.x += n;
    }
    else {
      this.block.x -= n;
    }
    n++;
  }
  if (n > 4) {
    this.block.x = tmp;
    this.block.rotate(-dir);
  }
}

//check collision for horizontal movements
Player.prototype.tackles = function () {
  for (let i = 0; i < this.block.matrixSize; i++) {
    for (let j = 0; j < this.block.matrixSize; j++) {
      if (this.block.matrix[j][i] != 0 && (this.block.x + i < 0 || this.block.x + i > c - 1 || arena.grid[this.block.y + j][this.block.x + i] != 0)) {
        return true;
      }
    }
  }
  return false;
}

//update player position
Player.prototype.update = function () {
  if (keyIsDown(40)) {
    if (this.downKeyTimer == 0) {
      this.block.y++;
      this.downKeyTimer = 3;
    }
    else {
      this.downKeyTimer--;
    }
  }
  else{
    this.dropTimer++;
    if (this.dropTimer >= this.maxDropTimer) {
      this.block.y++;
      this.dropTimer = 0;
    }
  }
  if (keyIsDown(37)) {
    if (this.leftKeyTimer == 0) {
      this.block.x--;
      this.leftKeyTimer = 15;
      if (this.tackles()) {
        player.block.x++;
      }
    }
    else {
      this.leftKeyTimer--;
    }
  }
  if (keyIsDown(39)) {
    if (this.rightKeyTimer == 0) {
      this.block.x++;
      this.rightKeyTimer = 15;
      if (this.tackles()) {
        player.block.x--;
      }
    }
    else {
      this.rightKeyTimer--;
    }
  }
  if (this.lands()) {
    this.block.y--;
    this.merge();
    this.newBlock();
    arena.sweep();
  }
}
