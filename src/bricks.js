import Brick from './brick.js';

class Bricks {
  constructor({ columns, rows, width, height, padding, offsetLeft, offsetTop, color }) {
    this.columns = columns;
    this.rows = rows;
    this.bricks = [];
    this.width = width;
    this.height = height;
    this.padding = padding;
    this.offsetLeft = offsetLeft;
    this.offsetTop = offsetTop;
    this.color = color;

    this.init();
  }

  init() {
    for (let column = 0; column < this.columns; column += 1) {
      this.bricks[column] = [];
      for (let row = 0; row < this.rows; row += 1) {
        const brickX = (column * (this.width + this.padding)) + this.offsetLeft;
        const brickY = (row * (this.height + this.padding)) + this.offsetTop;
        this.bricks[column][row] = new Brick(brickX, brickY, this.width, this.height, this.color);
        console.log(this.bricks[column][row]);
      }
    }
  }

  render(ctx) {
    for (let column = 0; column < this.columns; column += 1) {
      for (let row = 0; row < this.rows; row += 1) {
        const brick = this.bricks[column][row];
        if (brick.status === 1) {
          brick.render(ctx);
        }
      }
    }
  }
}

export default Bricks;
