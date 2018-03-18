class Block {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type; //types (1='I',2='Z',3='S',4='J',5='L',6='T',7='O')
    switch (this.type) {
      case I:
        this.matrixSize = 4;
        this.matrix = [
          [0, 0, 0, 0],
          [I, I, I, I],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ];
        this.colours = {
          outer: I_OUTER_COLOUR,
          inner: I_INNER_COLOUR,
        };
        break;
      case Z:
        this.matrixSize = 3;
        this.matrix = [
          [Z, Z, 0],
          [0, Z, Z],
          [0, 0, 0],
        ];
        this.colours = {
          outer: Z_OUTER_COLOUR,
          inner: Z_INNER_COLOUR,
        };
        break;
      case S:
        this.matrixSize = 3;
        this.matrix = [
          [0, S, S],
          [S, S, 0],
          [0, 0, 0],
        ];
        this.colours = {
          outer: S_OUTER_COLOUR,
          inner: S_INNER_COLOUR,
        };
        break;
      case J:
        this.matrixSize = 3;
        this.matrix = [
          [J, 0, 0],
          [J, J, J],
          [0, 0, 0],
        ];
        this.colours = {
          outer: J_OUTER_COLOUR,
          inner: J_INNER_COLOUR,
        };
        break;
      case L:
        this.matrixSize = 3;
        this.matrix = [
          [0, 0, L],
          [L, L, L],
          [0, 0, 0],
        ];
        this.colours = {
          outer: L_OUTER_COLOUR,
          inner: L_INNER_COLOUR,
        };
        break;
      case T:
        this.matrixSize = 3;
        this.matrix = [
          [0, 0, 0],
          [0, T, 0],
          [T, T, T],
        ];
        this.colours = {
          outer: T_OUTER_COLOUR,
          inner: T_INNER_COLOUR,
        };
        break;
      case O:
        this.matrixSize = 2;
        this.matrix = [
          [O, O],
          [O, O],
        ];
        this.colours = {
          outer: O_OUTER_COLOUR,
          inner: O_INNER_COLOUR,
        };
        break;
    }
  }

  // Displays block on canvas
  display(offset) {
    for (let i = 0; i < this.matrixSize; i++) {
      for (let j = 0; j < this.matrixSize; j++) {
        if (this.matrix[j][i]) {
          // Outer square
          stroke(EDGE_COLOUR);
          fill(this.colours.outer);
          rect(SCALE*(this.x + i + offset), SCALE*(this.y + j), SCALE, SCALE);

          // Inner square
          noStroke();
          fill(this.colours.inner);
          rect(SCALE*(this.x + i + 1/4 + offset), SCALE*(this.y + j + 1/4), SCALE/2, SCALE/2);
        }
      }
    }
  }

  // Rotates block
  rotate(direction) {
    for (let i = 0; i < this.matrixSize; i++) {
      for (let j = 0; j < i; j++) {
        // Tuple swap
        [this.matrix[j][i], this.matrix[i][j]] = [this.matrix[i][j], this.matrix[j][i]]
      }
    }
    // Clockwise
    if (direction === CLOCKWISE) {
      for (let i = 0; i < this.matrixSize; i++) {
        this.matrix[i].reverse();
      }
    }
    // Anticlockwise
    else {
      this.matrix.reverse();
    }

    if (player.collides()) {
      player.reposition(direction);
    }
  }
}
