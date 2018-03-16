class Cell {
  constructor(col, row) {
    this.x = SCALE*col + X_OFFSET;
    this.y = SCALE*row + Y_OFFSET;
    this.marked = false;
    this.mine = false;
    this.revealed = false;
    this.markedCount = 0;
    this.indice = 0;
    this.revealedCount = 0;
  }

  // Checks if cell contains given coordinates
  contains(x, y) {
    if (x > this.x && x <= this.x + SCALE && y > this.y && y <= this.y + SCALE) {
      return true;
    }
    return false;
  }

  // Displays cell on canvas
  display() {
    if (this.marked) {
      fill(MINEFIELD_COLOUR);
      rect(this.x, this.y, SCALE, SCALE);
      line(this.x + SCALE/4, this.y + SCALE/4, this.x + SCALE*3/4, this.y + SCALE*3/4);
      line(this.x + SCALE/4, this.y + SCALE*3/4, this.x + SCALE*3/4, this.y + SCALE /4);
    }
    else if (this.revealed) {
      fill(CELL_COLOUR);
      rect(this.x, this.y, SCALE, SCALE);
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      textSize(SCALE/2);
      if (this.mine) {
        fill(MINE_COLOUR);
        ellipse(this.x + SCALE/2, this.y + SCALE/2, SCALE/3, SCALE/3);
      }
      else if (this.indice) {
        switch (this.indice) {
          case 1:
            fill(ONE_COLOUR);
            break;
          case 2:
            fill(TWO_COLOUR);
            break;
          case 3:
            fill(THREE_COLOUR);
            break;
          case 4:
            fill(FOUR_COLOUR);
            break;
          case 5:
            fill(FIVE_COLOUR);
            break;
          case 6:
            fill(SIX_COLOUR);
            break;
          case 7:
            fill(SEVEN_COLOUR);
            break;
          case 8:
            fill(EIGHT_COLOUR);
            break;
        }
        text(this.indice, this.x + SCALE/2, this.y + SCALE/2);
      }
    }
    else {
      fill(MINEFIELD_COLOUR);
      rect(this.x, this.y, SCALE, SCALE);
    }
  }
}
