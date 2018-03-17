//constructor for new blocks
function Block(x, y, type) {
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
      ]
      break;
    //'Z' shape
    case 2:
      this.matrixSize = 3;
      this.matrix = [
        [2, 2, 0],
        [0, 2, 2],
        [0, 0, 0],
      ]
      break;
    //'S' shape
    case 3:
      this.matrixSize = 3;
      this.matrix = [
        [0, 3, 3],
        [3, 3, 0],
        [0, 0, 0],
      ]
      break;
    //'J' shape
    case 4:
      this.matrixSize = 3;
      this.matrix = [
        [4, 0, 0],
        [4, 4, 4],
        [0, 0, 0],
      ]
      break;
    //'L' shape
    case 5:
      this.matrixSize = 3;
      this.matrix = [
        [0, 0, 5],
        [5, 5, 5],
        [0, 0, 0],
      ]
      break;
    //'T' shape
    case 6:
      this.matrixSize = 3;
      this.matrix = [
        [0, 0, 0],
        [0, 6, 0],
        [6, 6, 6],
      ]
      break;
    //'O' shape
    case 7:
      this.matrixSize = 2;
      this.matrix = [
        [7, 7],
        [7, 7],
      ]
      break;
  }
}

//displays inputted block on canvas
Block.prototype.display = function (offset) {
  for (let i = 0; i < this.matrixSize; i++) {
    for (let j = 0; j < this.matrixSize; j++) {
      stroke(255);
      switch (this.matrix[j][i]) {
        case 1:
          fill(0, 191, 255);
          break;
        case 2:
          fill(255, 0, 0);
          break;
        case 3:
          fill(0, 100, 0);
          break;
        case 4:
          fill(0, 0, 255);
          break;
        case 5:
          fill(255, 69, 0);
          break;
        case 6:
          fill(255, 105, 180);
          break;
        case 7:
          fill(255, 165, 0);
          break;
        default:
          noStroke();
          noFill();
      }
      rect(d * (this.x + i + offset), d * (this.y + j), d, d);
      noStroke();
      switch (this.matrix[j][i]) {
        case 1:
          fill(15, 155, 255);
          break;
        case 2:
          fill(160, 0, 0);
          break;
        case 3:
          fill(0, 140, 0);
          break;
        case 4:
          fill(0, 0, 139);
          break;
        case 5:
          fill(255, 100, 0);
          break;
        case 6:
          fill(255, 70, 147);
          break;
        case 7:
          fill(255, 215, 0);
          break;
        default:
          noFill();
      }
      rect(d * (this.x + i + 1 / 4 + offset), d * (this.y + j + 1 / 4), d / 2, d / 2);
    }
  }
}

//rotates block
Block.prototype.rotate = function (dir) {
  for (let i = 0; i < this.matrixSize; i++) {
    for (let j = 0; j < i; j++) {
      //swap
      [this.matrix[j][i], this.matrix[i][j]] = [this.matrix[i][j], this.matrix[j][i]]
    }
  }
  //clockwise
  if (dir == 1) {
    for (let i = 0; i < this.matrixSize; i++) {
      this.matrix[i].reverse();
    }
  }
  //anticlockwise
  else {
    this.matrix.reverse();
  }
}
