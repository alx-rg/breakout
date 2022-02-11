/* eslint-disable max-len */
import Brick from './brick.js';
import Bricks from './bricks.js';
import Ball from './ball.js';
import Paddle from './paddle.js';
import GameText from './gametext.js';

const button = document.getElementById('new-game');

let continueGame = true;

button.onclick = () => {
  continueGame = true;
  document.location.reload();
};

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const createColor = () => {
  const newColor = Math.floor(Math.random() * 16777215).toString(16);
  return newColor;
};

const colorArray = [createColor(), createColor(), createColor(), createColor(), createColor()];

const displayOnScreen = (text) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '25px apple-system,system-ui';
  ctx.fillStyle = `#${colorArray[0]}`;
  ctx.fillText(text, 170, canvas.height / 2);
};

// const canvas = document.getElementById('myCanvas');
// const button = document.getElementById('new-game');

// const ctx = canvas.getContext('2d');
// const ballRadius = 10;
// let x = canvas.width / 2;
// let y = canvas.height - 30;
// let dx = 2;
// let dy = -2;
// const paddleHeight = 10;
// const paddleWidth = 75;
// let paddleX = (canvas.width - paddleWidth) / 2;
// let rightPressed = false;
// let leftPressed = false;
// const brickRowCount = 3;
// const brickColumnCount = 5;
// const brickWidth = 75;
// const brickHeight = 16;
// const brickPadding = 10;
// const brickOffsetTop = 30;
// const brickOffsetLeft = 30;
// let score = 0;
// let lives = 3;
// let continueGame = true;

// const createColor = () => {
//   const newColor = Math.floor(Math.random() * 16777215).toString(16);
//   return newColor;
// };

// const colorArray = [createColor(), createColor(), createColor(), createColor(), createColor()];

// const ball = new Ball(200, 200, 10);
// const paddle = new Paddle(0, canvas.height - 10, 75, 10);
// const bricks = new Bricks(brickColumnCount, brickRowCount, brickWidth, brickHeight, brickPadding, brickOffsetLeft, brickOffsetTop, colorArray[2]);

// button.onclick = () => {
//   continueGame = true;
//   document.location.reload();
// };

// // const bricks = [];

// for (let c = 0; c < brickColumnCount; c += 1) {
//   bricks.bricks[c] = [];
//   for (let r = 0; r < brickRowCount; r += 1) {
//     bricks.bricks[c][r] = { x: 0, y: 0, status: 1 };
//   }
// }

// const displayOnScreen = (text) => {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.font = '25px apple-system,system-ui';
//   ctx.fillStyle = `#${colorArray[0]}`;
//   ctx.fillText(text, 170, canvas.height / 2);
// };

// const mouseMoveHandler = (e) => {
//   const relativeX = e.clientX - canvas.offsetLeft;
//   if (relativeX > 0 && relativeX < canvas.width) {
//     paddleX = relativeX - paddleWidth / 2;
//   }
// };

// document.addEventListener('mousemove', mouseMoveHandler, false);

// const keyDownHandler = (e) => {
//   if (e.key === 'Right' || e.key === 'ArrowRight') {
//     rightPressed = true;
//   } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
//     leftPressed = true;
//   }
// };

// document.addEventListener('keydown', keyDownHandler, false);

// const keyUpHandler = (e) => {
//   if (e.key === 'Right' || e.key === 'ArrowRight') {
//     rightPressed = false;
//   } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
//     leftPressed = false;
//   }
// };

// document.addEventListener('keyup', keyUpHandler, false);

// const collisionDetection = () => {
//   for (let c = 0; c < brickColumnCount; c += 1) {
//     for (let r = 0; r < brickRowCount; r += 1) {
//       const b = bricks[c][r];
//       if (b.status === 1) {
//         if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
//           dy = -dy;
//           b.status = 0;
//           score += 1;
//           if (score === brickRowCount * brickColumnCount) {
//             displayOnScreen('You Win, Congrats!');
//             continueGame = false;
//           }
//         }
//       }
//     }
//   }
// };

// const drawScore = () => {
//   ctx.font = '16px Arial';
//   ctx.fillStyle = '#0095DD';
//   ctx.fillText(`Score: ${score}`, 8, 20);
// };

// const drawLives = () => {
//   ctx.font = '16px ComicSans';
//   ctx.fillStyle = '#0090DD';
//   ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
// };

// const draw = () => {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ball.render(ctx);
//   paddle.render(ctx);
//   bricks.render(ctx);
//   drawScore();
//   drawLives();
//   collisionDetection();

//   if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
//     dx = -dx;
//   } if (y + dy < ballRadius) {
//     dy = -dy;
//   } else if (y + dy > canvas.height - ballRadius) {
//     if (x > paddleX && x < paddleX + paddleWidth) {
//       dy = -dy;
//     } else {
//       lives -= 1;
//       if (!lives) {
//         displayOnScreen('GAME OVER');
//         continueGame = false;
//       } else {
//         x = canvas.width / 2;
//         y = canvas.height - 30;
//         dx = 3;
//         dy = -3;
//         paddleX = (canvas.width - paddleWidth) / 2;
//       }
//     }
//   }

//   if (rightPressed && paddleX < canvas.width - paddleWidth) {
//     paddleX += 7;
//   } else if (leftPressed && paddleX > 0) {
//     paddleX -= 7;
//   }

//   x += dx;
//   y += dy;
//   if (continueGame) {
//     requestAnimationFrame(draw);
//   }
// };

// draw();

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

    this.colorArray = [createColor(), createColor(), createColor(), createColor(), createColor()];

    this.button = document.getElementById('new-game');
    this.ball = new Ball(0, 0, 2, -2, this.ballRadius, `#${this.colorArray[2]}`);
    this.paddle = new Paddle(this.paddleXStart, this.paddleYStart, this.paddleWidth, this.paddleHeight, `#${this.colorArray[1]}`);
    // this.bricks = new Bricks(this.brickColumnCount, this.brickRowCount);

    this.bricks = new Bricks({
      columns: this.brickColumnCount,
      rows: this.brickRowCount,
      width: this.brickWidth,
      height: this.brickHeight,
      padding: this.brickPadding,
      offsetLeft: this.brickOffsetLeft,
      offsetTop: this.brickOffsetTop,
      color: this.colorArray[3],
    });

    this.scoreLabel = new GameText('Score: ', 8, 20, `#${this.colorArray[4]}`);
    this.liveLabel = new GameText('Lives: ', this.canvas.width - 65, 20, `#${this.colorArray[2]}`);
    this.winMessage = new GameText('You Win, Congrats!', 170, this.canvas.height / 2, `#${this.colorArray[4]}`, '25px apple-system,system-ui');
    this.loseMessage = new GameText('You Game Overrred', 170, this.canvas.height / 2, `#${this.colorArray[3]}`, '25px apple-system,system-ui');

    this.rightPressed = false;
    this.leftPressed = false;

    this.setup();

    // if (continueGame = true) {
    //   requestAnimationFrame(() => {
    //     this.draw();
    //   });
    // }

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
              this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
              displayOnScreen('You Win, Congrats!');
              // this.continueGame = false;
              continueGame = false;
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
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          displayOnScreen('You losttttt');
          continueGame = false;
          // this.continueGame = false;
        } else {
          this.ball.x = this.canvas.width / 2;
          this.ball.y = this.canvas.height - 30;
          this.ball.dx = 2;
          this.ball.dy = -2;
          this.paddle.x = this.paddleXStart;
        }
      }
    }

    // if (continueGame) {
    //   requestAnimationFrame(this.draw);
    // }
  }

  // button.onclick() {
  //   continueGame = true;
  //   document.location.reload();
  // }

  mouseMoveHandler(e) {
    const relativeX = e.clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
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
    // const width = this.canvas.width;
    // const height = this.canvas.height;
    // this.ctx.clearRect(0, 0, width, height);
    this.ball.render(this.ctx);
    this.paddle.render(this.ctx);
    this.scoreLabel.render(this.ctx);
    this.liveLabel.render(this.ctx);
    this.bricks.render(this.ctx);
    this.collisionDetection();
    this.movePaddle();
    this.ball.move();
    this.paddleAndCanvasColissions();

    // requestAnimationFrame(() => {
    //   this.draw();
    // });
    // if (continueGame = true) {
    //   requestAnimationFrame(() => {
    //     this.draw();
    //   });
    // }

    if (continueGame) {
      requestAnimationFrame(this.draw.bind(this));
    }
  }
}

export default Game;
