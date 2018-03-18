class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.score = 0;
    this.dropTimer = 0;
    this.shiftLeftKeyTimer = 0;
    this.shiftRightKeyTimer = 0;

    // For difficulty
    this.level = 1;
    this.blockCounter = 0;
    this.maxDropTimer = FRAMERATE;

    // For randomizer
    this.bucket = [1, 2, 3, 4, 5, 6, 7];
    this.bucketIndex = 6;

    // For storage
    this.typeStored = 0;
    this.storageUsed = false;

    // For queue
    this.nextTypeQueue = [0, 0, 0];
    for (let i = 0; i < this.nextTypeQueue.length; i++) {
      this.nextTypeQueue[i] = this.randomizer();
    }
    this.nextBlockQueue = [3];
  }

  // Checks for rotation and spawn collision
  collides() {
    for (let i = 0; i < this.block.matrixSize; i++) {
      for (let j = 0; j < this.block.matrixSize; j++) {
        if (this.block.matrix[j][i] != 0 && (this.block.x < 0 ||
          this.block.x > COLUMNS - 1 ||this.block.y + j > ROWS - 1 ||
            arena.grid[this.block.y + j][this.block.x + i] != 0)) {
          return true;
        }
      }
    }
    return false;
  }

  // Displays blocks on canvas
  display() {
    for (let i = 0; i < this.nextTypeQueue.length; i++) {
      this.nextBlockQueue[i].display(0);
    }
    if (this.typeStored) {
      this.blockStored.display(0);
    }
    this.block.display(6);
  }

  // Instantly drops player block till it lands
  instantDrop() {
    while (!this.lands()) {
      this.block.y++;
    }
    this.block.y--;
    this.dropTimer = FRAMERATE;
  }

  // Checks for vertical collision
  lands() {
    for (let i = 0; i < this.block.matrixSize; i++) {
      for (let j = 0; j < this.block.matrixSize; j++) {
        if (this.block.matrix[j][i] != 0 && (this.block.y + j > ROWS - 1 ||
          arena.grid[this.block.y + j][this.block.x + i] != 0)) {
          return true;
        }
      }
    }
    return false;
  }

  // Merges player block with arena
  merge() {
    for (let i = 0; i < this.block.matrixSize; i++) {
      for (let j = 0; j < this.block.matrixSize; j++) {
        if (this.block.matrix[j][i] != 0) {
          arena.grid[this.block.y + j][this.block.x + i] = this.block.matrix[j][i];
        }
      }
    }
  }

  // Spawns new player block
  newBlock() {
    this.block = new Block (this.x, this.y, this.nextTypeQueue[0]);
    for (let i = 0; i < this.nextTypeQueue.length - 1; i++) {
      this.nextTypeQueue[i] = this.nextTypeQueue[i + 1];
    }
    this.nextTypeQueue[this.nextTypeQueue.length - 1] = this.randomizer();
    this.blockCounter++;
    for (let i = 0; i < this.nextTypeQueue.length; i++) {
      switch (this.nextTypeQueue[i]) {
        case I:
        this.nextBlockQueue[i] = new Block(COLUMNS + 7, 3.5 + i*5, this.nextTypeQueue[i]);
          break;
        case T:
        this.nextBlockQueue[i] = new Block(COLUMNS + 7.5, 3 + i*5, this.nextTypeQueue[i]);
          break;
        case O:
        this.nextBlockQueue[i] = new Block(COLUMNS + 8, 4 + i*5, this.nextTypeQueue[i]);
          break;
        default:
        this.nextBlockQueue[i] = new Block(COLUMNS + 7.5, 4 + i*5, this.nextTypeQueue[i]);
      }
    }
    if (this.blockCounter%7 === 6) {
      this.level++;
      this.maxDropTimer -= FRAMERATE/this.level/3;
    }
    if (this.collides()) {
      newGame();
    }
    this.storageUsed = false;
  }

  // Stores block in reserve
  store() {
    if (!this.typeStored) {
      this.typeStored = this.block.type;
      this.newBlock();
    }
    else if(!player.storageUsed) {
      //swap
      var tmp = this.block.type;
      this.block = new Block (this.x, this.y, this.typeStored);
      this.typeStored = tmp;
    }
    switch (this.typeStored) {
      case I:
      this.blockStored = new Block(1, 3.5, this.typeStored);
        break;
      case T:
      this.blockStored = new Block(1.5, 3, this.typeStored);
        break;
      case O:
      this.blockStored = new Block(2, 4, this.typeStored);
        break;
      default:
      this.blockStored = new Block(1.5, 4, this.typeStored);
    }
    this.storageUsed = true;
  }

  // Generates random block type based on tetris standard
  randomizer() {
    if (this.bucketIndex === 6) {
      // Shuffle bucket
      for (let i = 6; i > 0; i--) {
        const j = floor(random(i));
        const tmp = this.bucket[i];
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

  // Repositions block to avoid collision during rotation
  reposition(direction) {
    const tmp = this.block.x;
    let n = 1;
    while(this.collides() && n < 5) {
      if (this.block.x%2) {
        this.block.x += n;
      }
      else {
        this.block.x -= n;
      }
      n++;
    }
    if (n > 4) {
      this.block.x = tmp;
      this.block.rotate(-direction);
    }
  }

  resetKeyTimer(keyCode) {
    switch (keyCode) {
      case DROP:
        this.dropKeyTimer = 0;
        this.dropTimer = 0;
        break;
      case SHIFT_LEFT:
        this.shiftLeftKeyTimer = 0;
        break;
      case SHIFT_RIGHT:
        this.shiftRightKeyTimer = 0;
        break;
      case ROTATE_CLOCKWISE:
        this.rotateClockwiseKeyTimer = 0;
        break;
      case ROTATE_ANTICLOCKWISE:
        this.rotateAnticlockwiseKeyTimer = 0;
        break;
    }
  }

  // Checks collision for horizontal movement
  tackles() {
    for (let i = 0; i < this.block.matrixSize; i++) {
      for (let j = 0; j < this.block.matrixSize; j++) {
        if (this.block.matrix[j][i] != 0 && (this.block.x + i < 0 ||
          this.block.x + i > COLUMNS - 1 || arena.grid[this.block.y + j][this.block.x + i])) {
          return true;
        }
      }
    }
    return false;
  }

  // Updates player block's position
  update() {
    if (keyIsDown(DROP)) {
      if (this.downKeyTimer === 0) {
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
    if (keyIsDown(SHIFT_LEFT)) {
      if (this.shiftLeftKeyTimer === 0) {
        this.block.x--;
        this.shiftLeftKeyTimer = 15;
        if (this.tackles()) {
          player.block.x++;
        }
      }
      else {
        this.shiftLeftKeyTimer--;
      }
    }
    if (keyIsDown(SHIFT_RIGHT)) {
      if (this.shiftRightKeyTimer === 0) {
        this.block.x++;
        this.shiftRightKeyTimer = 15;
        if (this.tackles()) {
          player.block.x--;
        }
      }
      else {
        this.shiftRightKeyTimer--;
      }
    }
    if (this.lands()) {
      this.block.y--;
      this.merge();
      this.newBlock();
      arena.sweep();
    }
  }
}
