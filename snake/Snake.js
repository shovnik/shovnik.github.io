class Snake {
  constructor(x, y) {
    this.head = createVector(x, y);
    this.tail = [];
    this.xSpeed = SCALE/20;
    this.ySpeed = 0;
    this.score = 0;
    this.growthCounter = 1;
    this.turnCounter = 1;
  }

  // Displays snake on canvas
  display() {
    fill(SNAKE_COLOUR);
    ellipse(this.head.x + SCALE/2, this.head.y + SCALE/2, SCALE, SCALE);
    for (let i = 0; i < this.tail.length; i++) {
      ellipse(this.tail[i].x + SCALE/2, this.tail[i].y + SCALE/2, SCALE, SCALE);
    }
    if (this.tail.length > 0) {
      ellipse(this.tail[this.tail.length - 1].x + SCALE/2, this.tail[this.tail.length - 1].y + SCALE/2, SCALE*7/8, SCALE*7/8);
      ellipse(this.tail[this.tail.length - 1].x + SCALE/2, this.tail[this.tail.length - 1].y + SCALE/2, SCALE*3/4, SCALE*3/4);
      ellipse(this.tail[this.tail.length - 1].x + SCALE/2, this.tail[this.tail.length - 1].y + SCALE/2, SCALE*5/8, SCALE*5/8);
      ellipse(this.tail[this.tail.length - 1].x + SCALE/2, this.tail[this.tail.length - 1].y + SCALE/2, SCALE/2, SCALE/2);
      ellipse(this.tail[this.tail.length - 1].x + SCALE/2, this.tail[this.tail.length - 1].y + SCALE/2, SCALE*3/8, SCALE*3/8);
      ellipse(this.tail[this.tail.length - 1].x + SCALE/2, this.tail[this.tail.length - 1].y + SCALE/2, SCALE/4, SCALE/4);
      ellipse(this.tail[this.tail.length - 1].x + SCALE/2, this.tail[this.tail.length - 1].y + SCALE/2, SCALE/8, SCALE/8);
    }
    if (this.xSpeed > 0) {
      fill(EYE_COLOUR);
      arc(this.head.x + SCALE*3/4, this.head.y + SCALE/4, SCALE*3/8, SCALE*3/8, PI*3/2, PI/2);
      arc(this.head.x + SCALE*3/4, this.head.y + SCALE*3/4, SCALE*3/8, SCALE*3/8, PI*3/2, PI/2);
      fill(PUPIL_COLOUR);
      arc(this.head.x + SCALE*3/4, this.head.y + SCALE/4, SCALE*3/16, SCALE*3/16, PI*3/2, PI/2);
      arc(this.head.x + SCALE*3/4, this.head.y + SCALE/4, SCALE*3/8, SCALE*3/8, PI/2, PI*3/2);
      arc(this.head.x + SCALE*3/4, this.head.y + SCALE*3/4, SCALE*3/16, SCALE*3/16, PI*3/2, PI/2);
      arc(this.head.x + SCALE*3/4, this.head.y + SCALE*3/4, SCALE*3/8, SCALE*3/8, PI/2, PI*3/2);
    }
    else if (this.ySpeed > 0) {
      fill(EYE_COLOUR);
      arc(this.head.x + SCALE*3/4, this.head.y + SCALE*3/4, SCALE*3/8, SCALE*3/8, 0, PI);
      arc(this.head.x + SCALE/4, this.head.y + SCALE*3/4, SCALE*3/8, SCALE*3/8, 0, PI);
      fill(PUPIL_COLOUR);
      arc(this.head.x + SCALE*3/4, this.head.y + SCALE*3/4, SCALE*3/16, SCALE*3/16, 0, PI);
      arc(this.head.x + SCALE*3/4, this.head.y + SCALE*3/4, SCALE*3/8, SCALE*3/8, PI, 0);
      arc(this.head.x + SCALE/4, this.head.y + SCALE*3/4, SCALE*3/16, SCALE*3/16, 0, PI);
      arc(this.head.x + SCALE/4, this.head.y + SCALE*3/4, SCALE*3/8, SCALE*3/8, PI, 0);
    }
    else if (this.xSpeed < 0) {
      fill(255);
      arc(this.head.x + SCALE/4, this.head.y + SCALE*3/4, SCALE*3/8, SCALE*3/8, PI/2, PI*3/2);
      arc(this.head.x + SCALE/4, this.head.y + SCALE/4, SCALE*3/8, SCALE*3/8, PI/2, PI*3/2);
      fill(0);
      arc(this.head.x + SCALE/4, this.head.y + SCALE*3/4, SCALE*3/16, SCALE*3/16, PI/2, PI*3/2);
      arc(this.head.x + SCALE/4, this.head.y + SCALE*3/4, SCALE*3/8, SCALE*3/8, PI*3/2, PI/2);
      arc(this.head.x + SCALE/4, this.head.y + SCALE/4, SCALE*3/16, SCALE*3/16, PI/2, PI*3/2);
      arc(this.head.x + SCALE/4, this.head.y + SCALE/4, SCALE*3/8, SCALE*3/8, PI*3/2, PI/2);
    }
    else if (this.ySpeed < 0) {
      fill(255);
      arc(this.head.x + SCALE/4, this.head.y + SCALE/4, SCALE*3/8, SCALE*3/8, PI, 0);
      arc(this.head.x + SCALE*3/4, this.head.y + SCALE/4, SCALE*3/8, SCALE*3/8, PI, 0);
      fill(0);
      arc(this.head.x + SCALE/4, this.head.y + SCALE/4, SCALE*3/16, SCALE*3/16, PI, 0);
      arc(this.head.x + SCALE/4, this.head.y + SCALE/4, SCALE*3/8, SCALE*3/8, 0, PI);
      arc(this.head.x + SCALE*3/4, this.head.y + SCALE/4, SCALE*3/16, SCALE*3/16, PI, 0);
      arc(this.head.x + SCALE*3/4, this.head.y + SCALE/4, SCALE*3/8, SCALE*3/8, 0, PI);
    }
    this.head.x += this.xSpeed;
    this.head.y += this.ySpeed;
  }

  // Checks collision for snake head with wall or tail
  collide() {
    if (this.head.x < 0 || this.head.y < 0 || this.head.x > SCALE*19 || this.head.y > SCALE*19) {
      return true;
    }
    for (let i = 20; i < this.tail.length; i++) {
      if (dist(this.tail[i].x, this.tail[i].y, this.head.x, this.head.y) < 10) {
        return true;
      }
    }
    return false;
  }

  // Grows snake tail
  eat(x, y) {
    append(this.tail, createVector(x, y));
  }

  // Turns snake based on key pressed
  turn(keyCode) {
    switch (keyCode) {
      case LEFT:
        if (this.xSpeed === 0) {
          this.xSpeed = - SCALE / 20;
          this.ySpeed = 0;
        }
        break;
      case UP:
        if (this.ySpeed === 0) {
          this.xSpeed = 0;
          this.ySpeed = - SCALE / 20;
        }
        break;
      case RIGHT:
        if (this.xSpeed === 0) {
          this.xSpeed = SCALE / 20;
          this.ySpeed = 0;
        }
        break;
      case DOWN:
        if (this.ySpeed === 0) {
          this.xSpeed = 0;
          this.ySpeed = SCALE / 20;
        }
    }
  }

  // Updates snake position and score
  update() {
    if (!this.tail.length) {
      var tmpx = this.head.x;
      var tmpy = this.head.y;
    }
    if (this.tail.length > 0) {
      tmpx = this.tail[this.tail.length - 1].x;
      tmpy = this.tail[this.tail.length - 1].y;
    }
    for (let i = this.tail.length - 1; i > 0; i--) {
      this.tail[i].x = this.tail[i - 1].x;
      this.tail[i].y = this.tail[i - 1].y;
    }
    if (this.tail.length > 0) {
      this.tail[0].x = this.head.x;
      this.tail[0].y = this.head.y;
    }
    this.head.x += this.xSpeed;
    this.head.y += this.ySpeed;
    if (dist(this.head.x,this.head.y,food.x, food.y) < SCALE) {
      this.eat(tmpx, tmpy);
      this.score += 100;
      food = new Food();
      this.growthCounter++;
    }
    if ((this.growthCounter > 0 && this.growthCounter < 10)) {
      this.eat(tmpx, tmpy);
      this.growthCounter++;
    }
    else if (this.growthCounter == 10) {
      this.growthCounter  = 0;
    }
    if (this.collide()) {
      newGame();
    }
    if ((this.turnCounter > 0 && this.turnCounter < 10)) {
      this.turnCounter++;
    }
    else if (this.turnCounter == 10) {
      inputPressed = false;
      this.turnCounter  = 0;
    }
  }
}
