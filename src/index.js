/* eslint-disable max-classes-per-file */
// import Sprite from './sprite.js';
// import Brick from './brick.js';
// import Ball from './ball.js';

const canvas = document.getElementById('myCanvas');
const button = document.getElementById('new-game');
const ctx = canvas.getContext('2d');

const paddleHeight = 10;
const paddleWidth = 75;
const brickRowCount = 4;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 15;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
const paddleXStart = (canvas.width - paddleWidth) / 2;
const paddleYStart = canvas.height - paddleHeight;
const pi2 = Math.PI * 2;

const ballRadius = 10;

let rightPressed = false;
let leftPressed = false;
// let score = 0;
// let lives = 3;
let continueGame = true;

const createColor = () => {
  const newColor = Math.floor(Math.random() * 16777215).toString(16);
  return newColor;
};

const colorArray = [createColor(), createColor(), createColor(), createColor(), createColor()];

class Ball {
  constructor(x = 0, y = 0, dx = 2, dy = -2, radius = 10, color = 'red') {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, pi2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }
}

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
    ctx.fillStyle = `#${colorArray[1]}`;
    // ctx.fillStyle = `#${colorArray[this.row + 1]}`;
    ctx.fill();
    ctx.closePath();
  }
}

class Bricks {
  constructor(columns, rows) {
    this.columns = columns;
    this.rows = rows;
    this.bricks = [];
  }

  init() {
    for (let column = 0; column < this.columns; column += 1) {
      this.bricks[column] = [];
      for (let row = 0; row < this.rows; row += 1) {
        const brickX = (column * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop;
        this.bricks[column][row]=new Brick(brickX, brickY, brickWidth, brickHeight, colorArray[0]);
      }
    }
  }

  render(ctx) {
    for (let c = 0; c < this.columns; c += 1) {
      for (let r = 0; r < this.rows; r += 1) {
        const brick = this.bricks[c][r];
        if (brick.status === 1) {
          brick.render(ctx);
        }
      }
    }
  }
}

class Paddle {
  constructor(x, y, width, height, color = 'blue') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  moveBy(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class GameText {
  constructor(text, x, y, color, font = '16px Arial') {
    this.text = text;
    this.x = x;
    this.y = y;
    this.color = color;
    this.value = 0;
    this.font = font;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`${this.text} ${this.value}`, this.x, this.y);
  }
}

class Game {
  constructor() {
    this.button = document.getElementById('new-game');
    this.scoreLabel = new GameText('Score: ', 8, 20);
    this.liveLabel = new GameText('Lives: ', canvas.width - 65, 20);
    this.ball = new Ball(0, 0, 2, -2, ballRadius, colorArray[1]);
    this.paddle = new Paddle(paddleXStart, paddleYStart, paddleWidth, paddleHeight, colorArray[0]);
    this.bricks = new Bricks(brickColumnCount, brickRowCount);
    this.winMessage = new GameText('You Win, Congrats!', 170, canvas.height / 2, `#${colorArray[0]}`, '25px apple-system,system-ui');
    this.loseMessage = new GameText('You Game Overrred', 170, canvas.height / 2, `#${colorArray[0]}`, '25px apple-system,system-ui');

    this.rightPressed = false;
    this.leftPressed = false;

    this.setup();

    this.draw();
  }

  setup() {
    this.liveLabel.value = 3;
    this.resetBallandPaddle();
    document.addEventListener('mousemove', (e) => {
      this.mouseMoveHandler(e);
    }, false);
    document.addEventListener('keydown', (e) => {
      this.keyDownHandler(e);
    }, false);
    document.addEventListener('keyup', (e) => {
      this.keyUpHandler(e);
    }, false);
  }

  resetBallandPaddle() {
    this.ball.x = canvas.width / 2;
    this.ball.y = canvas.height - 30;
    this.ball.dx = 2;
    this.ball.dy = -2;
    this.paddle.x = paddleXStart;
  }

  collisionDetection() {
    for (let c = 0; c < this.bricks.columns; c += 1) {
      for (let r = 0; r < this.bricks.rows; r += 1) {
        const brick = this.bricks.bricks[c][r];
        if (brick.status === 1) {
          if (this.ball.x > brick.x && this.ball.x < brick.x + brickWidth
            && this.ball.y > brick.y && this.ball.y < brick.y + brickHeight) {
            this.ball.dy = -this.ball.dy;
            brick.status = 0;
            this.scoreLabel.value += 1;
            if (this.scoreLabel.value === this.bricks.columns * this.bricks.rows) {
              this.winMessage.render(ctx);
              continueGame = false;
            }
          }
        }
      }
    }
  }

  movePaddle() {
    if (this.rightPressed && this.paddle.x < canvas.width - this.paddle.width) {
      this.paddle.moveBy(7, 0);
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.moveBy(-7, 0);
    }
  }

  paddleAndCanvasColissions() {
    if (this.ball.x + this.ball.dx > canvas.width - this.ball.radius
      || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
    } if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > canvas.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.dy = -this.ball.dy;
      } else {
        this.liveLabel.value -= 1;

        if (this.liveLabel.value < 1) {
          this.loseMessage(ctx);
          continueGame = false;
        } else {
          this.ball.x = canvas.width / 2;
          this.ball.y = canvas.height - 30;
          this.ball.dx = 2;
          this.ball.dy = -2;
          this.paddle.x = paddleXStart;
        }
      }
    }
    if (continueGame) {
      requestAnimationFrame(this.draw);
    }
  }
  // button.onclick() {
  //   continueGame = true;
  //   document.location.reload();
  // }

  mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (this.relativeX > 0 && relativeX < canvas.width) {
      this.paddle.moveTo(relativeX - this.paddle.width / 2, paddleYStart);
    }
  }

  // moveArrow(e, direction) {
  //   const arrow = (e.key === direction || e.key === `Arrow${direction}`);
  //   return arrow;
  // }

  keyDownHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  // keyDownHandler(e) {
  //   if (this.moveArrow(e, 'Right')) {
  //     this.rightPressed = true;
  //   } else if (this.moveArrow(e, 'Left')) {
  //     this.leftPressed = true;
  //   }
  // }

  keyUpHandler(e) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }
  // keyUpHandler(e) {
  //   if (this.moveArrow(e, 'Right')) {
  //     this.rightPressed = false;
  //   } else if (this.moveArrow(e, 'Left')) {
  //     this.leftPressed = false;
  //   }
  // }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.bricks.render(ctx);
    this.ball.render(ctx);
    this.paddle.render(ctx);
    this.scoreLabel.render(ctx);
    this.liveLabel.render(ctx);
    this.collisionDetection();
    this.movePaddle();
    this.ball.move();
    this.paddleAndCanvasColissions();

    // requestAnimationFrame(this.draw.bind(this));
    requestAnimationFrame(() => {
      this.draw();
    });
  }
} // ------------------------------------------------

const game = new Game();

// draw();
