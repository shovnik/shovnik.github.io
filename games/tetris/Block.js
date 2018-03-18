class Block {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type; //types (1='I',2='Z',3='S',4='J',5='L',6='T',7='O')
    switch (this.type) {
      //'I' shape
      case 1:
        this.matrixSize = 4;
        this.matrix = [
          [0, 0, 0, 0],
          [1, 1, 1, 1],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ];
        this.colours = {
          outer: I_OUTER_COLOUR,
          inner: I_INNER_COLOUR,
        };
        break;
      //'Z' shape
      case 2:
        this.matrixSize = 3;
        this.matrix = [
          [2, 2, 0],
          [0, 2, 2],
          [0, 0, 0],
        ];
        this.colours = {
          outer: Z_OUTER_COLOUR,
          inner: Z_INNER_COLOUR,
        };
        break;
      //'S' shape
      case 3:
        this.matrixSize = 3;
        this.matrix = [
          [0, 3, 3],
          [3, 3, 0],
          [0, 0, 0],
        ];
        this.colours = {
          outer: S_OUTER_COLOUR,
          inner: S_INNER_COLOUR,
        };
        break;
      //'J' shape
      case 4:
        this.matrixSize = 3;
        this.matrix = [
          [4, 0, 0],
          [4, 4, 4],
          [0, 0, 0],
        ];
        this.colours = {
          outer: J_OUTER_COLOUR,
          inner: J_INNER_COLOUR,
        };
        break;
      //'L' shape
      case 5:
        this.matrixSize = 3;
        this.matrix = [
          [0, 0, 5],
          [5, 5, 5],
          [0, 0, 0],
        ];
        this.colours = {
          outer: L_OUTER_COLOUR,
          inner: L_INNER_COLOUR,
        };
        break;
      //'T' shape
      case 6:
        this.matrixSize = 3;
        this.matrix = [
          [0, 0, 0],
          [0, 6, 0],
          [6, 6, 6],
        ];
        this.colours = {
          outer: T_OUTER_COLOUR,
          inner: T_INNER_COLOUR,
        };
        break;
      //'O' shape
      case 7:
        this.matrixSize = 2;
        this.matrix = [
          [7, 7],
          [7, 7],
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
