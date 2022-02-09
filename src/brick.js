// import Sprite from './sprite.js';

// class Brick extends Sprite {
//   constructor(x, y, width = 75, height = 20, color = '#0095DD') {
//     super(x, y, width, height, color);
//     this.status = true;
//   }
// }

class Brick {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.status = 1;
    this.width = width;
    this.height = height;
    this.color = color;
    // this.row = row;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    // ctx.fillStyle = `#${colorArray[this.row + 1]}`;
    ctx.fill();
    ctx.closePath();
  }
}

export default Brick;
