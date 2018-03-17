class Piece {
  constructor(x, y, colour, queen) {
    this.x = d * (x + 1 / 2);
    this.y = d * (y + 1 / 2);
    this.colour = colour;
    this.queen = queen;
  }
  //displays piece on create
  display() {
    if (this.colour === 1) {
      fill(192, 0, 0);
    } else {
      fill(0);
    }
    ellipse(this.x, this.y, d * 3 / 4, d * 3 / 4);
    if (this.queen) {
      fill(128, 0, 0);
      ellipse(this.x, this.y, d * 1 / 2, d * 1 / 2);
    }
  }
}
