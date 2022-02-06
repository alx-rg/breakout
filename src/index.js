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
let score = 0;
let lives = 3;
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

const bricks = new Bricks(brickColumnCount, brickRowCount);

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

const paddle = new Paddle(paddleXStart, paddleYStart, paddleWidth, paddleHeight, colorArray[0]);

class Score {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Lives {
  constructor(x, y = 20) {
    this.x = x;
    this.y = y;
  }
}

class Text {
  constructor(x, y = 20) {
    this.x = x;
    this.y = y;
  }
}

class Game {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const ball = new Ball(0, 0, 2, -2, ballRadius, colorArray[1]);

const resetBallandPaddle = () => {
  ball.x = canvas.width / 2;
  ball.y = canvas.height - 30;
  ball.dx = 2;
  ball.dy = -2;
  paddle.x = paddleXStart;
};

resetBallandPaddle();

button.onclick = () => {
  continueGame = true;
  document.location.reload();
};

// const bricks = [];

// const initializeBricks = () => {
//   for (let column = 0; column < brickColumnCount; column += 1) {
//     bricks[column] = [];
//     for (let row = 0; row < brickRowCount; row += 1) {
//       const brickX = (column * (brickWidth + brickPadding)) + brickOffsetLeft;
//       const brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop;
//       bricks[column][row] = new Brick(brickX, brickY, brickWidth, brickHeight, colorArray[0], row);
//     }
//   }
// };

// initializeBricks();

const displayOnScreen = (text) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '25px apple-system,system-ui';
  ctx.fillStyle = `#${colorArray[0]}`;
  ctx.fillText(text, 170, canvas.height / 2);
};

const mouseMoveHandler = (e) => {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.moveTo(relativeX - paddle.width / 2, paddleYStart);
  }
};

const moveArrow = (e, direction) => {
  const arrow = (e.key === direction || e.key === `Arrow${direction}`);
  return arrow;
};

const keyDownHandler = (e) => {
  if (moveArrow(e, 'Right')) {
    rightPressed = true;
  } else if (moveArrow(e, 'Left')) {
    leftPressed = true;
  }
};

const keyUpHandler = (e) => {
  if (moveArrow(e, 'Right')) {
    rightPressed = false;
  } else if (moveArrow(e, 'Left')) {
    leftPressed = false;
  }
};

const movePaddle = () => {
  if (rightPressed && paddle.x < canvas.width - paddle.width) {
    paddle.moveBy(7, 0);
  } else if (leftPressed && paddle.x > 0) {
    paddle.moveBy(-7, 0);
  }
};
document.addEventListener('mousemove', mouseMoveHandler, false);
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

const collisionDetection = () => {
  for (let c = 0; c < bricks.columns; c += 1) {
    for (let r = 0; r < bricks.rows; r += 1) {
      const brick = bricks.bricks[c][r];
      if (brick.status === 1) {
        if (ball.x > brick.x && ball.x < brick.x + brickWidth
          && ball.y > brick.y && ball.y < brick.y + brickHeight) {
          ball.dy = -ball.dy;
          brick.status = 0;
          score += 1;
          if (score === brickRowCount * brickColumnCount) {
            displayOnScreen('You Win, Congrats!');
            continueGame = false;
          }
        }
      }
    }
  }
};



const drawScore = () => {
  ctx.font = '16px Arial';
  ctx.fillStyle = `#${colorArray[1]}`;
  ctx.fillText(`Score: ${score}`, 8, 20);
};

const drawLives = () => {
  ctx.font = '16px ComicSans';
  ctx.fillStyle = `#${colorArray[2]}`;
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
};

// const drawPaddle = () => {
//   ctx.beginPath();
//   ctx.rect(paddle.x, canvas.height - paddleHeight, paddle.width, paddle.height);
//   ctx.fillStyle = `#${colorArray[0]}`;
//   ctx.fill();
//   ctx.closePath();
// };

// const drawBricks = () => {
//   for (let c = 0; c < brickColumnCount; c += 1) {
//     for (let r = 0; r < brickRowCount; r += 1) {
//       const brick = bricks[c][r];
//       if (brick.status === 1) {
//         brick.render(ctx);
//       }
//     }
//   }
// };

// const moveBall = () => {
//   ball.x += ball.dx;
//   ball.y += ball.dy;
// };

const paddleAndCanvasColissions = () => {
  if (ball.x + ball.dx > canvas.width - ballRadius || ball.x + ball.dx < ballRadius) {
    ball.dx = -ball.dx;
  } if (ball.y + ball.dy < ballRadius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ballRadius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy;
    } else {
      lives -= 1;
      if (!lives) {
        displayOnScreen('GAME OVER');
        continueGame = false;
      } else {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 30;
        ball.dx = 2;
        ball.dy = -2;
        paddle.x = paddleXStart;
      }
    }
  }

  if (continueGame) {
    requestAnimationFrame(draw);
  }
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // drawBricks();
  bricks.render(ctx);
  ball.render(ctx);
  paddle.render(ctx);
  // drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  // moveBall();
  movePaddle();
  ball.move();
  paddleAndCanvasColissions();
};

draw();

// const a = new Sprite(20, 40, 200, 40, 'orange');
// a.render(ctx);

// const b = new Brick(100, 50);
// b.render(ctx);

// const ball = new Ball(200, 200, 10);
// console.log(ball.x);
// console.log(ball.y);
// console.log(ball.radius);
