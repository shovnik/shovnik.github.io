class Board {
  constructor() {
    this.grid = [DIMENSIONS];
    for (let i = 0; i < DIMENSIONS; i++) {
      this.grid[i] = [DIMENSIONS];
      for (let j = 0; j < DIMENSIONS; j++) {
        this.grid[i][j] = 0;
      }
    }
  }

  // Checks if board is full
  full() {
    for (let i = 0; i < DIMENSIONS; i++) {
      for (let j = 0; j < DIMENSIONS; j++) {
        if (!this.grid[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  // Displays board on canvas
  display() {
    for (let i = 0; i < DIMENSIONS; i++) {
      for (let j = 0; j < DIMENSIONS; j++) {
        fill(TILE_COLOUR);
        rect(SCALE*i, SCALE*j, SCALE, SCALE);
        if (this.grid[i][j] > 0) {
          fill(TEXT_COLOUR);
          text(this.grid[i][j], SCALE*(i + 1/2), SCALE*(j + 1/2));
        }
      }
    }
  }

  // Spawns a 2 at a random unoccupied location
  randomSpawn() {
    let spawned = false;
    while (!spawned) {
      const i = floor(random(4));
      const j = floor(random(4));
      if (!this.grid[i][j]) {
        this.grid[i][j] = 2;
        spawned = true;
      }
    }
  }

  // Slides each row or column combining identical values
  slide(direction) {
    switch (direction) {
      case LEFT:
        for (let j = 0; j < DIMENSIONS; j++) {
          for (let i = 0; i < DIMENSIONS; i++) {
            let k = i + 1;
            while (k < DIMENSIONS && !this.grid[i][j]) {
              this.grid[i][j] = this.grid[k][j];
              this.grid[k][j] = 0;
              k++;
            }
            let done = false;
            while (k < DIMENSIONS && !done) {
              if (this.grid[i][j] === this.grid[k][j]) {
                this.grid[i][j] *= 2;
                this.grid[k][j] = 0;
                done = true;
              }
              k++;
            }
          }
        }
        break;
      case UP:
        for (let i = 0; i < DIMENSIONS; i++) {
          for (let j = 0; j < DIMENSIONS; j++) {
            let k = j + 1;
            while (k < DIMENSIONS && !this.grid[i][j]) {
              this.grid[i][j] = this.grid[i][k];
              this.grid[i][k] = 0;
              k++;
            }
            let done = false;
            while (k < DIMENSIONS && !done) {
              if (this.grid[i][j] === this.grid[i][k]) {
                this.grid[i][j] *= 2;
                this.grid[i][k] = 0;
                done = true;
              }
              k++;
            }
          }
        }
        break;
      case RIGHT:
        for (let j = 0; j < DIMENSIONS; j++) {
          for (let i = DIMENSIONS - 1; i >= 0; i--) {
            let k = i - 1;
            while (k >= 0 && !this.grid[i][j]) {
              this.grid[i][j] = this.grid[k][j];
              this.grid[k][j] = 0;
              k--;
            }
            let done = false;
            while (k >= 0 && !done) {
              if (this.grid[i][j] === this.grid[k][j]) {
                this.grid[i][j] *= 2;
                this.grid[k][j] = 0;
                done = true;
              }
              k--;
            }
          }
        }
        break;
      case DOWN:
        for (let i = 0; i < DIMENSIONS; i++) {
          for (let j = 0; j < DIMENSIONS; j++) {
            let k = j - 1;
            while (k >= 0 && !this.grid[i][j]) {
              this.grid[i][j] = this.grid[i][k];
              this.grid[i][k] = 0;
              k--;
            }
            let done = false;
            while (k >= 0 && !done) {
              if (this.grid[i][j] === this.grid[i][k]) {
                this.grid[i][j] *= 2;
                this.grid[i][k] = 0;
                done = true;
              }
              k--;
            }
          }
        }
    }
  }
}
