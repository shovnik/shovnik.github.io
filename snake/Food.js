class Food {
  constructor() {
    do {
      this.x = floor(random(1900))*SCALE/100;
      this.y = floor(random(1900))*SCALE/100;
    } while (this.onSnake());
  }

  // Displays food on canvas
  display() {
    fill(128, 0, 0);
    ellipse(this.x + SCALE/2, this.y + SCALE/2, SCALE, SCALE);
  }

  // Checks if food on top of snake
  onSnake() {
    if (dist(snake.head.x,snake.head.y, this.x, this.y) < SCALE) {
      return true;
    }
    else {
      for (let i = 0; i < snake.tail.length; i++) {
        if(snake.tail[i].x == this.x && snake.tail[i].y == this.y) {
          return true;
        }
      }
    }
    return false;
  }
}
