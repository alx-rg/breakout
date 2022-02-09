/* eslint-disable max-len */
import Brick from './brick.js';
import Bricks from './bricks.js';
import Ball from './ball.js';
import Paddle from './paddle.js';
import GameText from './gametext.js';

class Game {
  constructor(canvasID) {
    this.canvas = document.getElementById(canvasID);
    this.ctx = this.canvas.getContext('2d');

    this.button = document.getElementById('new-game');
    this.paddleHeight = 10;
    this.paddleWidth = 75;
    this.brickRowCount = 4;
    this.brickColumnCount = 5;
    this.brickWidth = 75;
    this.brickHeight = 15;
    this.brickPadding = 10;
    this.brickOffsetTop = 30;
    this.brickOffsetLeft = 30;
    this.paddleXStart = (this.canvas.width - this.paddleWidth) / 2;
    this.paddleYStart = this.canvas.height - this.paddleHeight;

    this.ballRadius = 10;

    this.continueGame = true;

    // let rightPressed = false;
    // let leftPressed = false;
    // let continueGame = true;

    const createColor = () => {
      const newColor = Math.floor(Math.random() * 16777215).toString(16);
      return newColor;
    };

    const colorArray = [createColor(), createColor(), createColor(), createColor(), createColor()];

    this.button = document.getElementById('new-game');
    this.ball = new Ball(0, 0, 2, -2, this.ballRadius, colorArray[1]);
    this.paddle = new Paddle(this.paddleXStart, this.paddleYStart, this.paddleWidth, this.paddleHeight, colorArray[0]);
    // this.bricks = new Bricks(this.brickColumnCount, this.brickRowCount);

    this.bricks = new Bricks({
      cols: this.brickColumnCount,
      rows: this.brickRowCount,
      width: this.brickWidth,
      height: this.brickHeight,
      padding: this.brickPadding,
      offsetLeft: this.brickOffsetLeft,
      offsetTop: this.brickOffsetTop,
      color: colorArray[3],
    });

    this.scoreLabel = new GameText('Score: ', 8, 20);
    this.liveLabel = new GameText('Lives: ', this.canvas.width - 65, 20);
    this.winMessage = new GameText('You Win, Congrats!', 170, this.canvas.height / 2, `#${colorArray[0]}`, '25px apple-system,system-ui');
    this.loseMessage = new GameText('You Game Overrred', 170, this.canvas.height / 2, `#${colorArray[0]}`, '25px apple-system,system-ui');

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
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height - 30;
    this.ball.dx = 2;
    this.ball.dy = -2;
    this.paddle.x = this.paddleXStart;
  }

  collisionDetection() {
    for (let c = 0; c < this.bricks.columns; c += 1) {
      for (let r = 0; r < this.bricks.rows; r += 1) {
        const brick = this.bricks.bricks[c][r];
        if (brick.status === 1) {
          if (this.ball.x > brick.x && this.ball.x < brick.x + this.brickWidth
            && this.ball.y > brick.y && this.ball.y < brick.y + this.brickHeight) {
            this.ball.dy = -this.ball.dy;
            brick.status = 0;
            this.scoreLabel.value += 1;
            if (this.scoreLabel.value === this.bricks.columns * this.bricks.rows) {
              this.winMessage.render(this.ctx);
              this.continueGame = false;
            }
          }
        }
      }
    }
  }

  movePaddle() {
    if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {
      this.paddle.moveBy(7, 0);
    } else if (this.leftPressed && this.paddle.x > 0) {
      this.paddle.moveBy(-7, 0);
    }
  }

  paddleAndCanvasColissions() {
    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius
      || this.ball.x + this.ball.dx < this.ball.radius) {
      this.ball.dx = -this.ball.dx;
    } if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy;
    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.dy = -this.ball.dy;
      } else {
        this.liveLabel.value -= 1;

        if (this.liveLabel.value < 1) {
          this.loseMessage(this.ctx);
          this.continueGame = false;
        } else {
          this.ball.x = this.canvas.width / 2;
          this.ball.y = this.canvas.height - 30;
          this.ball.dx = 2;
          this.ball.dy = -2;
          this.paddle.x = this.paddleXStart;
        }
      }
    }
    if (this.continueGame) {
      requestAnimationFrame(this.draw);
    }
  }
  // button.onclick() {
  //   continueGame = true;
  //   document.location.reload();
  // }

  mouseMoveHandler(e) {
    const relativeX = e.clientX - this.canvas.offsetLeft;
    if (this.relativeX > 0 && relativeX < this.canvas.width) {
      this.paddle.moveTo(relativeX - this.paddle.width / 2, this.paddleYStart);
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bricks.render(this.ctx);
    this.ball.render(this.ctx);
    this.paddle.render(this.ctx);
    this.scoreLabel.render(this.ctx);
    this.liveLabel.render(this.ctx);
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

export default Game;
