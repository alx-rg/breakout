import Sprite from './sprite.js';

// class Ball extends Sprite {
//   constructor(x = 0, y = 0, radius = 10, color = '#0095DD') {
//     super(x, y, 0, 0, color);
//     this.radius = radius;
//     this.dx = 2;
//     this.dy = -2;
//   }
class Ball extends Sprite {
  constructor(x = 0, y = 0, dx = 2, dy = -2, radius = 10, color = 'red') {
    super(x, y, 0, 0, color);
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.pi2 = Math.PI * 2;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, this.pi2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  move() {
    this.moveBy(this.dx, this.dy);
  }
}
export default Ball;
