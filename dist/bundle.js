/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ball.js":
/*!*********************!*\
  !*** ./src/ball.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _sprite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite.js */ \"./src/sprite.js\");\n\n\n// class Ball extends Sprite {\n//   constructor(x = 0, y = 0, radius = 10, color = '#0095DD') {\n//     super(x, y, 0, 0, color);\n//     this.radius = radius;\n//     this.dx = 2;\n//     this.dy = -2;\n//   }\nclass Ball extends _sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(x = 0, y = 0, dx = 2, dy = -2, radius = 10, color = 'red') {\n    super(x, y, 0, 0, color);\n    this.dx = dx;\n    this.dy = dy;\n    this.radius = radius;\n    this.color = color;\n    this.pi2 = Math.PI * 2;\n  }\n\n  render(ctx) {\n    ctx.beginPath();\n    ctx.arc(this.x, this.y, this.radius, 0, this.pi2);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.closePath();\n  }\n\n  move() {\n    this.moveBy(this.dx, this.dy);\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ball);\n\n\n//# sourceURL=webpack://breakout/./src/ball.js?");

/***/ }),

/***/ "./src/brick.js":
/*!**********************!*\
  !*** ./src/brick.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _sprite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite.js */ \"./src/sprite.js\");\n\n\n// class Brick extends Sprite {\n//   constructor(x, y, width = 75, height = 20, color = '#0095DD') {\n//     super(x, y, width, height, color);\n//     this.status = true;\n//   }\n// }\n\nclass Brick extends _sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(x, y, width, height, color = '#0095DD') {\n    super(x, y, width, height, color);\n\n    this.status = 1;\n    // this.row = row;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Brick);\n\n\n//# sourceURL=webpack://breakout/./src/brick.js?");

/***/ }),

/***/ "./src/bricks.js":
/*!***********************!*\
  !*** ./src/bricks.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _brick_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./brick.js */ \"./src/brick.js\");\n\n\nclass Bricks {\n  constructor({ columns, rows, width, height, padding, offsetLeft, offsetTop, color }) {\n    this.columns = columns;\n    this.rows = rows;\n    this.bricks = [];\n    this.width = width;\n    this.height = height;\n    this.padding = padding;\n    this.offsetLeft = offsetLeft;\n    this.offsetTop = offsetTop;\n    this.color = color;\n\n    this.init();\n  }\n\n  init() {\n    for (let column = 0; column < this.columns; column += 1) {\n      this.bricks[column] = [];\n      for (let row = 0; row < this.rows; row += 1) {\n        const brickX = (column * (this.width + this.padding)) + this.offsetLeft;\n        const brickY = (row * (this.height + this.padding)) + this.offsetTop;\n        this.bricks[column][row] = new _brick_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](brickX, brickY, this.width, this.height, this.color);\n        console.log(this.bricks[column][row]);\n      }\n    }\n  }\n\n  render(ctx) {\n    for (let column = 0; column < this.columns; column += 1) {\n      for (let row = 0; row < this.rows; row += 1) {\n        const brick = this.bricks[column][row];\n        if (brick.status === 1) {\n          brick.render(ctx);\n        }\n      }\n    }\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bricks);\n\n\n//# sourceURL=webpack://breakout/./src/bricks.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _brick_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./brick.js */ \"./src/brick.js\");\n/* harmony import */ var _bricks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bricks.js */ \"./src/bricks.js\");\n/* harmony import */ var _ball_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ball.js */ \"./src/ball.js\");\n/* harmony import */ var _paddle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./paddle.js */ \"./src/paddle.js\");\n/* harmony import */ var _gametext_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gametext.js */ \"./src/gametext.js\");\n/* eslint-disable max-len */\n\n\n\n\n\n\nconst button = document.getElementById('new-game');\n\nlet continueGame = true;\n\nbutton.onclick = () => {\n  continueGame = true;\n  document.location.reload();\n};\n\nconst canvas = document.getElementById('myCanvas');\nconst ctx = canvas.getContext('2d');\n\nconst createColor = () => {\n  const newColor = Math.floor(Math.random() * 16777215).toString(16);\n  return newColor;\n};\n\nconst colorArray = [createColor(), createColor(), createColor(), createColor(), createColor()];\n\nconst displayOnScreen = (text) => {\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\n  ctx.font = '25px apple-system,system-ui';\n  ctx.fillStyle = `#${colorArray[0]}`;\n  ctx.fillText(text, 170, canvas.height / 2);\n};\n\n// const canvas = document.getElementById('myCanvas');\n// const button = document.getElementById('new-game');\n\n// const ctx = canvas.getContext('2d');\n// const ballRadius = 10;\n// let x = canvas.width / 2;\n// let y = canvas.height - 30;\n// let dx = 2;\n// let dy = -2;\n// const paddleHeight = 10;\n// const paddleWidth = 75;\n// let paddleX = (canvas.width - paddleWidth) / 2;\n// let rightPressed = false;\n// let leftPressed = false;\n// const brickRowCount = 3;\n// const brickColumnCount = 5;\n// const brickWidth = 75;\n// const brickHeight = 16;\n// const brickPadding = 10;\n// const brickOffsetTop = 30;\n// const brickOffsetLeft = 30;\n// let score = 0;\n// let lives = 3;\n// let continueGame = true;\n\n// const createColor = () => {\n//   const newColor = Math.floor(Math.random() * 16777215).toString(16);\n//   return newColor;\n// };\n\n// const colorArray = [createColor(), createColor(), createColor(), createColor(), createColor()];\n\n// const ball = new Ball(200, 200, 10);\n// const paddle = new Paddle(0, canvas.height - 10, 75, 10);\n// const bricks = new Bricks(brickColumnCount, brickRowCount, brickWidth, brickHeight, brickPadding, brickOffsetLeft, brickOffsetTop, colorArray[2]);\n\n// button.onclick = () => {\n//   continueGame = true;\n//   document.location.reload();\n// };\n\n// // const bricks = [];\n\n// for (let c = 0; c < brickColumnCount; c += 1) {\n//   bricks.bricks[c] = [];\n//   for (let r = 0; r < brickRowCount; r += 1) {\n//     bricks.bricks[c][r] = { x: 0, y: 0, status: 1 };\n//   }\n// }\n\n// const displayOnScreen = (text) => {\n//   ctx.clearRect(0, 0, canvas.width, canvas.height);\n//   ctx.font = '25px apple-system,system-ui';\n//   ctx.fillStyle = `#${colorArray[0]}`;\n//   ctx.fillText(text, 170, canvas.height / 2);\n// };\n\n// const mouseMoveHandler = (e) => {\n//   const relativeX = e.clientX - canvas.offsetLeft;\n//   if (relativeX > 0 && relativeX < canvas.width) {\n//     paddleX = relativeX - paddleWidth / 2;\n//   }\n// };\n\n// document.addEventListener('mousemove', mouseMoveHandler, false);\n\n// const keyDownHandler = (e) => {\n//   if (e.key === 'Right' || e.key === 'ArrowRight') {\n//     rightPressed = true;\n//   } else if (e.key === 'Left' || e.key === 'ArrowLeft') {\n//     leftPressed = true;\n//   }\n// };\n\n// document.addEventListener('keydown', keyDownHandler, false);\n\n// const keyUpHandler = (e) => {\n//   if (e.key === 'Right' || e.key === 'ArrowRight') {\n//     rightPressed = false;\n//   } else if (e.key === 'Left' || e.key === 'ArrowLeft') {\n//     leftPressed = false;\n//   }\n// };\n\n// document.addEventListener('keyup', keyUpHandler, false);\n\n// const collisionDetection = () => {\n//   for (let c = 0; c < brickColumnCount; c += 1) {\n//     for (let r = 0; r < brickRowCount; r += 1) {\n//       const b = bricks[c][r];\n//       if (b.status === 1) {\n//         if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {\n//           dy = -dy;\n//           b.status = 0;\n//           score += 1;\n//           if (score === brickRowCount * brickColumnCount) {\n//             displayOnScreen('You Win, Congrats!');\n//             continueGame = false;\n//           }\n//         }\n//       }\n//     }\n//   }\n// };\n\n// const drawScore = () => {\n//   ctx.font = '16px Arial';\n//   ctx.fillStyle = '#0095DD';\n//   ctx.fillText(`Score: ${score}`, 8, 20);\n// };\n\n// const drawLives = () => {\n//   ctx.font = '16px ComicSans';\n//   ctx.fillStyle = '#0090DD';\n//   ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);\n// };\n\n// const draw = () => {\n//   ctx.clearRect(0, 0, canvas.width, canvas.height);\n//   ball.render(ctx);\n//   paddle.render(ctx);\n//   bricks.render(ctx);\n//   drawScore();\n//   drawLives();\n//   collisionDetection();\n\n//   if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {\n//     dx = -dx;\n//   } if (y + dy < ballRadius) {\n//     dy = -dy;\n//   } else if (y + dy > canvas.height - ballRadius) {\n//     if (x > paddleX && x < paddleX + paddleWidth) {\n//       dy = -dy;\n//     } else {\n//       lives -= 1;\n//       if (!lives) {\n//         displayOnScreen('GAME OVER');\n//         continueGame = false;\n//       } else {\n//         x = canvas.width / 2;\n//         y = canvas.height - 30;\n//         dx = 3;\n//         dy = -3;\n//         paddleX = (canvas.width - paddleWidth) / 2;\n//       }\n//     }\n//   }\n\n//   if (rightPressed && paddleX < canvas.width - paddleWidth) {\n//     paddleX += 7;\n//   } else if (leftPressed && paddleX > 0) {\n//     paddleX -= 7;\n//   }\n\n//   x += dx;\n//   y += dy;\n//   if (continueGame) {\n//     requestAnimationFrame(draw);\n//   }\n// };\n\n// draw();\n\nclass Game {\n  constructor(canvasID) {\n    this.canvas = document.getElementById(canvasID);\n    this.ctx = this.canvas.getContext('2d');\n\n    this.button = document.getElementById('new-game');\n    this.paddleHeight = 10;\n    this.paddleWidth = 75;\n    this.brickRowCount = 4;\n    this.brickColumnCount = 5;\n    this.brickWidth = 75;\n    this.brickHeight = 15;\n    this.brickPadding = 10;\n    this.brickOffsetTop = 30;\n    this.brickOffsetLeft = 30;\n    this.paddleXStart = (this.canvas.width - this.paddleWidth) / 2;\n    this.paddleYStart = this.canvas.height - this.paddleHeight;\n\n    this.ballRadius = 10;\n\n    this.continueGame = true;\n\n    // let rightPressed = false;\n    // let leftPressed = false;\n    // let continueGame = true;\n\n    this.colorArray = [createColor(), createColor(), createColor(), createColor(), createColor()];\n\n    this.button = document.getElementById('new-game');\n    this.ball = new _ball_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](0, 0, 2, -2, this.ballRadius, `#${this.colorArray[2]}`);\n    this.paddle = new _paddle_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.paddleXStart, this.paddleYStart, this.paddleWidth, this.paddleHeight, `#${this.colorArray[1]}`);\n    // this.bricks = new Bricks(this.brickColumnCount, this.brickRowCount);\n\n    this.bricks = new _bricks_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n      columns: this.brickColumnCount,\n      rows: this.brickRowCount,\n      width: this.brickWidth,\n      height: this.brickHeight,\n      padding: this.brickPadding,\n      offsetLeft: this.brickOffsetLeft,\n      offsetTop: this.brickOffsetTop,\n      color: this.colorArray[3],\n    });\n\n    this.scoreLabel = new _gametext_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]('Score: ', 8, 20, `#${this.colorArray[4]}`);\n    this.liveLabel = new _gametext_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]('Lives: ', this.canvas.width - 65, 20, `#${this.colorArray[2]}`);\n    this.winMessage = new _gametext_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]('You Win, Congrats!', 170, this.canvas.height / 2, `#${this.colorArray[4]}`, '25px apple-system,system-ui');\n    this.loseMessage = new _gametext_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]('You Game Overrred', 170, this.canvas.height / 2, `#${this.colorArray[3]}`, '25px apple-system,system-ui');\n\n    this.rightPressed = false;\n    this.leftPressed = false;\n\n    this.setup();\n\n    // if (continueGame = true) {\n    //   requestAnimationFrame(() => {\n    //     this.draw();\n    //   });\n    // }\n\n    this.draw();\n  }\n\n  setup() {\n    this.liveLabel.value = 3;\n    this.resetBallandPaddle();\n    document.addEventListener('mousemove', (e) => {\n      this.mouseMoveHandler(e);\n    }, false);\n    document.addEventListener('keydown', (e) => {\n      this.keyDownHandler(e);\n    }, false);\n    document.addEventListener('keyup', (e) => {\n      this.keyUpHandler(e);\n    }, false);\n  }\n\n  resetBallandPaddle() {\n    this.ball.x = this.canvas.width / 2;\n    this.ball.y = this.canvas.height - 30;\n    this.ball.dx = 2;\n    this.ball.dy = -2;\n    this.paddle.x = this.paddleXStart;\n  }\n\n  collisionDetection() {\n    for (let c = 0; c < this.bricks.columns; c += 1) {\n      for (let r = 0; r < this.bricks.rows; r += 1) {\n        const brick = this.bricks.bricks[c][r];\n        if (brick.status === 1) {\n          if (this.ball.x > brick.x && this.ball.x < brick.x + this.brickWidth\n            && this.ball.y > brick.y && this.ball.y < brick.y + this.brickHeight) {\n            this.ball.dy = -this.ball.dy;\n            brick.status = 0;\n            this.scoreLabel.value += 1;\n            if (this.scoreLabel.value === this.bricks.columns * this.bricks.rows) {\n              this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n              displayOnScreen('You Win, Congrats!');\n              // this.continueGame = false;\n              continueGame = false;\n            }\n          }\n        }\n      }\n    }\n  }\n\n  movePaddle() {\n    if (this.rightPressed && this.paddle.x < this.canvas.width - this.paddle.width) {\n      this.paddle.moveBy(7, 0);\n    } else if (this.leftPressed && this.paddle.x > 0) {\n      this.paddle.moveBy(-7, 0);\n    }\n  }\n\n  paddleAndCanvasColissions() {\n    if (this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius\n      || this.ball.x + this.ball.dx < this.ball.radius) {\n      this.ball.dx = -this.ball.dx;\n    } if (this.ball.y + this.ball.dy < this.ball.radius) {\n      this.ball.dy = -this.ball.dy;\n    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {\n      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {\n        this.ball.dy = -this.ball.dy;\n      } else {\n        this.liveLabel.value -= 1;\n\n        if (this.liveLabel.value < 1) {\n          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n          displayOnScreen('You losttttt');\n          continueGame = false;\n          // this.continueGame = false;\n        } else {\n          this.ball.x = this.canvas.width / 2;\n          this.ball.y = this.canvas.height - 30;\n          this.ball.dx = 2;\n          this.ball.dy = -2;\n          this.paddle.x = this.paddleXStart;\n        }\n      }\n    }\n\n    // if (continueGame) {\n    //   requestAnimationFrame(this.draw);\n    // }\n  }\n\n  // button.onclick() {\n  //   continueGame = true;\n  //   document.location.reload();\n  // }\n\n  mouseMoveHandler(e) {\n    const relativeX = e.clientX - this.canvas.offsetLeft;\n    if (relativeX > 0 && relativeX < this.canvas.width) {\n      this.paddle.moveTo(relativeX - this.paddle.width / 2, this.paddleYStart);\n    }\n  }\n\n  // moveArrow(e, direction) {\n  //   const arrow = (e.key === direction || e.key === `Arrow${direction}`);\n  //   return arrow;\n  // }\n\n  keyDownHandler(e) {\n    if (e.key === 'Right' || e.key === 'ArrowRight') {\n      this.rightPressed = true;\n    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {\n      this.leftPressed = true;\n    }\n  }\n\n  // keyDownHandler(e) {\n  //   if (this.moveArrow(e, 'Right')) {\n  //     this.rightPressed = true;\n  //   } else if (this.moveArrow(e, 'Left')) {\n  //     this.leftPressed = true;\n  //   }\n  // }\n\n  keyUpHandler(e) {\n    if (e.key === 'Right' || e.key === 'ArrowRight') {\n      this.rightPressed = false;\n    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {\n      this.leftPressed = false;\n    }\n  }\n  // keyUpHandler(e) {\n  //   if (this.moveArrow(e, 'Right')) {\n  //     this.rightPressed = false;\n  //   } else if (this.moveArrow(e, 'Left')) {\n  //     this.leftPressed = false;\n  //   }\n  // }\n\n  draw() {\n    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    // const width = this.canvas.width;\n    // const height = this.canvas.height;\n    // this.ctx.clearRect(0, 0, width, height);\n    this.ball.render(this.ctx);\n    this.paddle.render(this.ctx);\n    this.scoreLabel.render(this.ctx);\n    this.liveLabel.render(this.ctx);\n    this.bricks.render(this.ctx);\n    this.collisionDetection();\n    this.movePaddle();\n    this.ball.move();\n    this.paddleAndCanvasColissions();\n\n    // requestAnimationFrame(() => {\n    //   this.draw();\n    // });\n    // if (continueGame = true) {\n    //   requestAnimationFrame(() => {\n    //     this.draw();\n    //   });\n    // }\n\n    if (continueGame) {\n      requestAnimationFrame(this.draw.bind(this));\n    }\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\n\n\n//# sourceURL=webpack://breakout/./src/game.js?");

/***/ }),

/***/ "./src/gametext.js":
/*!*************************!*\
  !*** ./src/gametext.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _sprite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite.js */ \"./src/sprite.js\");\n\n\nclass GameText extends _sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(text, x, y, color, font = '16px Arial') {\n    super(x, y, 0, 0, color);\n    this.text = text;\n    this.value = 0;\n    this.font = font;\n  }\n\n  render(ctx) {\n    ctx.font = this.font;\n    ctx.fillStyle = this.color;\n    ctx.fillText(`${this.text} ${this.value}`, this.x, this.y);\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameText);\n\n\n//# sourceURL=webpack://breakout/./src/gametext.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\n\nconst game = new _game_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('myCanvas');\n\n//draw();\n\n\n//# sourceURL=webpack://breakout/./src/index.js?");

/***/ }),

/***/ "./src/paddle.js":
/*!***********************!*\
  !*** ./src/paddle.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _sprite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite.js */ \"./src/sprite.js\");\n\n\nclass Paddle extends _sprite_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(x, y, width, height, color = 'blue') {\n    super(x, y, width, height, color);\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Paddle);\n\n\n//# sourceURL=webpack://breakout/./src/paddle.js?");

/***/ }),

/***/ "./src/sprite.js":
/*!***********************!*\
  !*** ./src/sprite.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Sprite {\n  constructor(x = 0, y = 0, width = 10, height = 10, color = 'blue') {\n    this.x = x;\n    this.y = y;\n    this.width = width;\n    this.height = height;\n    this.color = color;\n  }\n\n  render(ctx) {\n    ctx.beginPath();\n    ctx.rect(this.x, this.y, this.width, this.height);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.closePath();\n  }\n\n  moveBy(dx, dy) {\n    this.x += dx;\n    this.y += dy;\n  }\n\n  moveTo(x, y) {\n    this.x = x;\n    this.y = y;\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sprite);\n\n\n//# sourceURL=webpack://breakout/./src/sprite.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;