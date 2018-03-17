//constructor for new arenas
function Arena() {
  this.grid = [];
  for (let i = 0; i < r + 1; i++) {
    this.grid[i] = [];
    for (let j = 0; j < c; j++) {
      this.grid[i][j] = 0;
    }
  }
}

//select cell colours based on block type
Arena.prototype.colours = function(type) {
  switch (type) {
    case 1:
      return {
        outer: 'DeepSkyBlue',
        inner: 'DodgerBlue',
      }
    case 2:
      return {
        outer: 'Red',
        inner: 'DarkRed',
      }
    case 3:
      return {
        outer: 'DarkGreen',
        inner: 'Green',
      }
    case 4:
      return {
        outer: 'Blue',
        inner: 'DarkBlue',
      }
    case 5:
      return {
        outer: 'Tomato',
        inner: 'DarkOrange',
      }
    case 6:
      return {
        outer: 'HotPink',
        inner: 'DeepPink',
      }
    case 7:
      return {
        outer: 'Orange',
        inner: 'Gold',
      }
    default:
      return null;
  }
}

//displays arena on canvas
Arena.prototype.display = function () {
  for (let i = 0; i < c; i++) {
    for (let j = 0; j < r; j++) {
      var colours = this.colours(this.grid[j][i]);
      stroke(255);
      if(colours) {
        fill(colours.outer);
        rect(d * (i + 6), d * j, d, d);
        noStroke();
        fill(colours.inner);
        rect(d * (i + 25 / 4), d * (j + 1 / 4), d / 2, d / 2);
      }
      else{
        fill('Black');
        rect(d * (i + 6), d * j, d, d);
      }
    }
  }
}

//scans arena for a full rows and sweeps them
Arena.prototype.sweep = function () {
  var sweepcounter = 0;
  outer: for (let i = r - 1; i >= 0; i--) {
    for (let j = 0; j < c; j++) {
      if (this.grid[i][j] == 0) {
        continue outer;
      }
    }
    sweepcounter++;
    var tmpRow = this.grid.splice(i, 1);
    for (let j = 0; j < c; j++) {
      tmpRow[j] = 0;
    }
    this.grid.unshift(tmpRow);
    i++;
  }
  while(sweepcounter) {
    score += sweepcounter * (60 + 20 * player.level);
    sweepcounter--;
  }
}
