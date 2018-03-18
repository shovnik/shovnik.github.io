class Minefield {
  constructor() {
    this.gameState = IN_PROGRESS;
    this.minesMarked = 0;
    this.score = 0;
    this.grid = [COLUMNS];
    for (let col = 0; col < COLUMNS; col++) {
      this.grid[col] = [ROWS];
      for (let row = 0; row < ROWS; row++) {
        this.grid[col][row] = new Cell(col, row);
      }
    }
    this.placeMines();
    this.placeIndices();
  }

  // Automatically marks cells surrounded by revealed non-mine cells
  automarkCell(col, row) {
    this.revealedCounter(col, row);
    if (this.grid[col][row].revealedCount === 8 || ((col === 0 || col === COLUMNS - 1 || row === 0 || row === ROWS - 1)
     && this.grid[col][row].revealedCount === 5) || (((col === 0 && row === 0) || (col === 0 && row === ROWS - 1) || (col === COLUMNS - 1 && row === 0)
      || (col === COLUMNS - 1 && row === ROWS - 1)) && this.grid[col][row].revealedCount === 3)) {
      this.grid[col][row].marked = true;
      this.minesMarked++;
      return true;
    }
    return false;
  }

  // Checks if game is won
  checkWin() {
    let won = true;
    for (let col = 0; col < COLUMNS; col++) {
      for (let row = 0; row < ROWS; row++) {
        if (!this.grid[col][row].marked && !this.grid[col][row].revealed) {
          if(!this.automarkCell(col, row)) {
            won = false;
          };
        }
      }
    }
    if (won && this.gameState !== LOST) {
      this.gameState = WON;
    }
  }

  // Interacts with click on minefield
  click(mouseButton) {
    for (let col = 0; col < COLUMNS; col++) {
      for (let row = 0; row < ROWS; row++) {
        if (this.grid[col][row].contains(mouseX, mouseY)) {
          if (!this.grid[col][row].revealed) {
            switch (mouseButton) {
              case LEFT:
                return this.leftClick(col, row);
              case RIGHT:
                return this.rightClick(col, row);
            }
          }
          else if(this.grid[col][row].indice && this.grid[col][row].indice === this.markedCounter(col, row)) {
            return this.quickReveal(col, row);
          }
        }
      }
    }
  }

  // Checks if minefield contains given coordinates
  contains(x, y) {
    if (x > X_OFFSET && x <= X_OFFSET + SCALE*COLUMNS && y > Y_OFFSET && y <= Y_OFFSET + SCALE*ROWS) {
      return true;
    }
    return false;
  }

  // Displays minefield upon canvas
  display() {
    fill(TEXT_COLOUR);
    text("Mines left: " + (MINES - this.minesMarked), SCALE*(COLUMNS + 1/2) - SCALE*3, SCALE*9/8);
    for (let col = 0; col < COLUMNS; col++) {
      for (let row = 0; row < ROWS; row++) {
        this.grid[col][row].display();
      }
    }
  }

  // Recursively reveals cells surrounding revealed cells with an indice of 0
  flourish(col, row) {
    for (let i = col - 1; i <= col + 1; i++) {
      for (let j = row - 1; j <= row + 1; j++) {
        if (i >= 0 && i < COLUMNS && j >= 0 && j < ROWS) {
          this.reveal(i, j);
        }
      }
    }
  }

  // Ends game in loss
  lost() {
    this.gameState = LOST;
    for (let col = 0; col < COLUMNS; col++) {
      for (let row = 0; row < ROWS; row++) {
        if (this.grid[col][row].mine) {
          this.grid[col][row].revealed = true;
        }
      }
    }
  }

  // Interacts with mouse left click
  leftClick(col, row) {
    if (!this.grid[col][row].marked) {
      if (this.grid[col][row].mine) {
        this.lost();
      }
      else {
        this.reveal(col, row);
        this.checkWin();
      }
    }
  }

  // Counts surrounding marked cells
  markedCounter(col, row) {
    let markedCount = 0;
    for (let i = col - 1; i <= col + 1; i++) {
      for (let j = row - 1; j <= row + 1; j++) {
        if (i >= 0 && i < COLUMNS && j >= 0 && j < ROWS) {
          if (this.grid[i][j].marked) {
            markedCount++;
          }
        }
      }
    }
    return markedCount;
  }

  // Stores indices of all unmined cells (surrounding mine count)
  placeIndices() {
    for (let col = 0; col < COLUMNS; col++) {
      for (let row = 0; row < ROWS; row++) {
        this.grid[col][row].indice = 0;
        for (let i = col - 1; i <= col + 1; i++) {
          for (let j = row - 1; j <= row + 1; j++) {
            if (i >= 0 && i < COLUMNS && j >= 0 && j < ROWS) {
              if (this.grid[i][j].mine) {
                this.grid[col][row].indice++;
              }
            }
          }
        }
      }
    }
  }

  // Places all mines at random locations
  placeMines() {
    for (let mine = 0; mine < MINES && mine < (COLUMNS*ROWS); mine++) {
      let minePlaced = false;
      while (!minePlaced) {
        const col = floor(random(COLUMNS));
        const row = floor(random(ROWS));
        if (!this.grid[col][row].mine) {
          this.grid[floor(col)][floor(row)].mine = true;
          minePlaced = true;
        }
      }
    }
  }

  // Instantly reveals all surrounding cells
  quickReveal(col, row) {
    for (let i = col - 1; i <= col + 1; i++) {
      for (let j = row - 1; j <= row + 1; j++) {
        if (i >= 0 && i < COLUMNS && j >= 0 && j < ROWS && !this.grid[i][j].marked && !this.grid[i][j].revealed) {
          if (this.grid[i][j].mine) {
            return this.lost();
          }
          this.reveal(i, j);
        }
      }
    }
    this.checkWin();
  }

  // Reveals unmarked cell
  reveal(col, row) {
    if (!this.grid[col][row].revealed) {
      this.grid[col][row].revealed = true;
      if (!this.grid[col][row].indice)  {
        this.flourish(col, row);
      }
    }
  }

  // Counts surrounding revealed cells
  revealedCounter(col, row) {
    this.grid[col][row].revealedCount = 0;
    for (let i = col - 1; i <= col + 1; i++) {
      for (let j = row - 1; j <= row + 1; j++) {
        if (i >= 0 && i < COLUMNS && j >= 0 && j < ROWS) {
          if (this.grid[i][j].revealed && !this.grid[i][j].mine) {
            this.grid[col][row].revealedCount++;
          }
        }
      }
    }
  }

  // Interacts with mouse right click
  rightClick(col, row) {
    if (!this.grid[col][row].marked && this.minesMarked < MINES) {
      this.grid[col][row].marked = true;
      this.minesMarked++;
    }
    else if (this.grid[col][row].marked) {
      this.grid[col][row].marked = false;
      this.minesMarked--;
    }
  }
}
