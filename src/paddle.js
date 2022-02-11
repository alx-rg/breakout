import Sprite from './sprite.js';

class Paddle extends Sprite {
  constructor(x, y, width, height, color = 'blue') {
    super(x, y, width, height, color);
  }
}

export default Paddle;
