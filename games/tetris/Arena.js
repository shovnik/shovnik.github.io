class Arena {
  constructor() {
    this.grid = [ROWS];
    for (let row = 0; row < ROWS + 1; row++) {
      this.grid[row] = [COLUMNS];
      for (let col = 0; col < COLUMNS; col++) {
        this.grid[row][col] = 0;
      }
    }
  }

  // Returns cell colour
  colours(type) {
    switch (type) {
      case I:
        return {
          outer: I_OUTER_COLOUR,
          inner: I_INNER_COLOUR,
        }
      case Z:
        return {
          outer: Z_OUTER_COLOUR,
          inner: Z_INNER_COLOUR,
        }
      case S:
        return {
          outer: S_OUTER_COLOUR,
          inner: S_INNER_COLOUR,
        }
      case J:
        return {
          outer: J_OUTER_COLOUR,
          inner: J_INNER_COLOUR,
        }
      case L:
        return {
          outer: L_OUTER_COLOUR,
          inner: L_INNER_COLOUR,
        }
      case T:
        return {
          outer: T_OUTER_COLOUR,
          inner: T_INNER_COLOUR,
        }
      case O:
        return {
          outer: O_OUTER_COLOUR,
          inner: O_INNER_COLOUR,
        }
      default:
        return null;
    }
  }

  // Displays arena on canvas
  display() {
    for (let col = 0; col < COLUMNS; col++) {
      for (let row = 0; row < ROWS; row++) {
        const colours = this.colours(this.grid[row][col]);
        stroke(EDGE_COLOUR);
        if(colours) {
          fill(colours.outer);
          rect(SCALE*(col + 6), SCALE*row, SCALE, SCALE);
          noStroke();
          fill(colours.inner);
          rect(SCALE*(col + 25/4), SCALE*(row + 1/4), SCALE/2, SCALE/2);
        }
        else{
          fill(BACKGROUND_COLOUR);
          rect(SCALE*(col + 6), SCALE*row, SCALE, SCALE);
        }
      }
    }
  }

  // Scans for full rows and sweeps them
  sweep() {
    let sweepcounter = 0;
    outer: for (let row = ROWS - 1; row >= 0; row--) {
      for (let col = 0; col < COLUMNS; col++) {
        if (this.grid[row][col] === 0) {
          continue outer;
        }
      }
      sweepcounter++;
      const tmpRow = this.grid.splice(row, 1);
      for (let col = 0; col < COLUMNS; col++) {
        tmpRow[col] = 0;
      }
      this.grid.unshift(tmpRow);
      row++;
    }
    while(sweepcounter) {
      this.score += sweepcounter*(60 + 20*player.level);
      sweepcounter--;
    }
  }
}
