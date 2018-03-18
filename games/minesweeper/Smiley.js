class Smiley {
  constructor(x, y) {
    this.x = SCALE*COLUMNS/2 + X_OFFSET;
    this.y = Y_OFFSET/2;
  }

  // Checks if Smiley contains given coordinates
  contains(x, y) {
    const distance = int(dist(this.x, this.y, x, y));
    if (distance < SCALE/2) {
      return true;
    }
    return false;
  }

  // Displays smiley on canvas
  display() {
    fill(FRAME_COLOUR);
    rect(width/2 -  SCALE*5/8, SCALE/2, SCALE*5/4, SCALE*5/4);
    fill(255, 255, 0);
    ellipse(this.x, this.y, SCALE, SCALE);
    fill(0);
    if (minefield.gameState === LOST) {
      line(this.x - SCALE*17/60, this.y - SCALE*5/24, this.x - SCALE*7/60, this.y - SCALE/24);
      line(this.x - SCALE*17/60, this.y - SCALE/24, this.x - SCALE*7/60, this.y - SCALE*5/24);
      line(this.x + SCALE*7/60, this.y - SCALE*5/24, this.x + SCALE*17/60, this.y - SCALE/24);
      line(this.x + SCALE*7/60, this.y - SCALE/24, this.x + SCALE*17/60, this.y - SCALE*5/24);
      if (mouseIsPressed && this.contains(mouseX, mouseY)) {
        fill(255);
        ellipse(this.x, this.y + SCALE/4, SCALE/4);
      }
      else {
        noFill();
        arc(this.x, this.y + SCALE/4, SCALE/2, SCALE/4, PI, 0);
      }
    }
    else if (minefield.gameState === WON) {
      ellipse(this.x - SCALE/5, this.y - SCALE/8, SCALE/4, SCALE/4);
      ellipse(this.x + SCALE/5, this.y - SCALE/8, SCALE/4, SCALE/4);
      line(this.x - SCALE/2, this.y, this.x - SCALE*13/40, this.y - SCALE/8);
      line(this.x - SCALE*13/40, this.y - SCALE/8, this.x + SCALE*13/40, this.y - SCALE/8);
      line(this.x + SCALE/2, this.y, this.x + SCALE*13/40, this.y - SCALE/8);
      if (mouseIsPressed && this.contains(mouseX, mouseY)) {
        fill(255);
        ellipse(this.x, this.y + SCALE/4, SCALE/4);
      }
      else {
        noFill();
        arc(this.x, this.y + SCALE/8, SCALE/2, SCALE/4, 0, PI);
      }
    }
    else if (mouseIsPressed) {
      ellipse(this.x - SCALE/5, this.y - SCALE/8, SCALE/6, SCALE/6);
      ellipse(this.x + SCALE/5, this.y - SCALE/8, SCALE/6, SCALE/6);
      fill(255);
      ellipse(this.x, this.y + SCALE/4, SCALE/4);
    }

    else {
      ellipse (this.x - SCALE/5, this.y - SCALE/8, SCALE/10, SCALE/10);
      ellipse (this.x + SCALE/5, this.y - SCALE/8, SCALE/10, SCALE/10);
      noFill();
      arc(this.x, this.y + SCALE/8, SCALE/2, SCALE/4, 0, PI);
    }
  }
}
