import Sprite from './sprite.js';

// class Brick extends Sprite {
//   constructor(x, y, width = 75, height = 20, color = '#0095DD') {
//     super(x, y, width, height, color);
//     this.status = true;
//   }
// }

class Brick extends Sprite {
  constructor(x, y, width, height, color = '#0095DD') {
    super(x, y, width, height, color);

    this.status = 1;
    // this.row = row;
  }
}

export default Brick;
