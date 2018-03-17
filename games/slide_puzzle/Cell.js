class Cell {
  constructor(x, y, value) {
    this.x = SCALE * x;
    this.y = SCALE * y;
    this.value = value;
    this.missing = false;
  }
  // Checks if cell contains given coordinates
  contains(x, y){
    if (x > this.x && x < this.x + SCALE && y > this.y && y < this.y + SCALE) {
      return true;
    }
    return false;
  }
  // Displays cells on canvas
  display() {
    if (!this.missing) {
      fill(TILE_COLOUR);
      rect(this.x, this.y, SCALE, SCALE);
      fill(TEXT_COLOUR);
      text(this.value, this.x + SCALE/2, this.y + SCALE/2);
    }
  }
}
