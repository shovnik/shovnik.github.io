class Board {
  constructor() {
    this.solved = false;
    this.grid = [COLUMNS];
    let value = 1;
    for (let col = 0; col < COLUMNS; col++) {
      this.grid[col] = [ROWS];
      for (let row = 0; row < ROWS; row++) {
        this.grid[col][row] = new Cell(row, col, value);
        value++;
      }
    }
    this.shuffle();
    this.missingLocation = this.removeTile();
  }

  // Checks if puzzle is solved
  checkSolve() {
    let value = 1;
    for (let col = 0; col < COLUMNS; col++) {
      for (let row = 0; row < ROWS; row++) {
        if (this.grid[col][row].value !== value) {
          return false;
        }
        value++;
      }
    }
    return true;
  }

  // Interacts with click on board
  click(mouseX, mouseY) {
    for (let col = 0; col < COLUMNS; col++) {
      for (let row = 0; row < ROWS; row++) {
        if (this.grid[col][row].contains(mouseX, mouseY)) {
          if ((this.missingLocation.x === col && (this.missingLocation.y === row + 1 ||
            this.missingLocation.y === row - 1)) || (this.missingLocation.y === row &&
              (this.missingLocation.x === col + 1 || this.missingLocation.x === col - 1))) {
            this.swapTiles(col, row);
          }
        }
      }
    }
    this.solved = this.checkSolve();
  }

  // Displays board on canvas
  display() {
    textSize(SCALE/2);
    for (let col = 0; col < COLUMNS; col++) {
      for (let row = 0; row < ROWS; row++) {
        this.grid[col][row].display();
      }
    }
  }

  // Returns 1D version of grid
  flattenGrid() {
    const grid1D = [];
    for (let col = 0; col < COLUMNS; col++) {
      for (let row = 0; row < ROWS; row++) {
        grid1D.push(this.grid[col][row].value);
      }
    }
    return grid1D;
  }

  // Counts inversions on board
  static inversionCount(grid1D) {
    let inversionCount = 0;
    for (let i = 0; i < grid1D.length - 1; i++) {
      for (let j = i + 1; j < grid1D.length; j++) {
        if (grid1D[i] !== grid1D.length && grid1D[j] !== grid1D.length && grid1D[i] > grid1D[j]) {
          inversionCount++;
        }
      }
    }
    return inversionCount;
  }

  // Checks if puzzle is solvable
  isSolvable() {
    const grid1D = this.flattenGrid();
    const inversionCount = Board.inversionCount(grid1D);
    if (grid1D.length % 2) {
      return !(inversionCount % 2);
    }
    let missingIndex = 0;
    while (grid1D[missingIndex] !== grid1D.length) {
      missingIndex++;
    }
    if (missingIndex % 2) {
      return !(inversionCount % 2);
    }
    return inversionCount % 2;
  }

  // Finds and removes tile of largest value
  removeTile() {
    for (let col = 0; col < COLUMNS; col++) {
      for (let row = 0; row < ROWS; row++) {
        if (this.grid[col][row].value === COLUMNS*ROWS) {
          this.grid[col][row].missing = true;
          return {
            x: col,
            y: row
          };
        }
      }
    }
  }

  // Shuffles tiles
  shuffle() {
    for (let col = COLUMNS - 1; col > 0; col--) {
      for (let row = ROWS - 1; row > 0; row--) {
        let randomX = floor(random(col + 1));
        let randomY = floor(random(row + 1));
        let temp = this.grid[col][row].value;
        this.grid[col][row].value = this.grid[randomX][randomY].value;
        this.grid[randomX][randomY].value = temp;
      }
    }
    if (!this.isSolvable()) {
      this.shuffle();
    }
  }

  // Swaps given tile with missing tile
  swapTiles(col, row) {
    let temp = this.grid[col][row].value;
    this.grid[col][row].value = this.grid[this.missingLocation.x][this.missingLocation.y].value;
    this.grid[this.missingLocation.x][this.missingLocation.y].value = temp;
    this.grid[this.missingLocation.x][this.missingLocation.y].missing = false;
    this.grid[col][row].missing = true;
    this.missingLocation.x = col;
    this.missingLocation.y = row;
  }
}
