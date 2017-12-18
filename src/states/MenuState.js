import {Phaser} from '../preloaders/phaser';
import FirstLevel from '../levels/FirstLevel';

class MenuState extends Phaser.State {
  static get STATE_NAME() {
    return 'menu';
  }

  constructor() {
    super();
  }

  create(game) {
    this._background = this.add.tileSprite(0, -50, game.width, 690, 'background');
    this._startButton = this.add.button(920, 550, 'startButton', this.startGame);
    this._startButton.scale.setTo(0.8, 0.8);
  }

  startGame() {
    this.game.state.start(FirstLevel.STATE_NAME);
  }
}

export default MenuState;
