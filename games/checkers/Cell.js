class Cell {
  constructor(x, y) {
    this.x = d * x;
    this.y = d * y;
    this.selected = false;
    this.piece = null;
  }
  //checks if cell contains coordinates
  contains(x, y){
    if (x > this.x && x < this.x + d && y > this.y && y < this.y + d) {
      return true;
    }
    return false;
  }
  //displays cells on canvas
  display() {
      if (this.selected) {
        fill(0, 0, 192);
      } else {
        fill(192);
      }
      rect(this.x, this.y, d, d);
      if (this.piece) {
        this.piece.display();
      }
  }
}
