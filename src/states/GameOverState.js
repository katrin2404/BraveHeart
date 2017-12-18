import {Phaser} from '../preloaders/phaser';
import FirstLevel from '../levels/FirstLevel';
import music from '../music/music';
import config from '../constans/config';

class GameOverState extends Phaser.State {
  static get STATE_NAME() {
    return 'gameOver';
  }

  constructor() {
    super();
  }

  create(game) {
    //  Stop the previous musics
    game.sound.stopAll();

    //  Create the death music
    music.create(this, game, 'death', 0.5);

    this.add.tileSprite(0, -50, game.width, 690, 'background');
    let rip = game.add.sprite(config.width / 2, config.height / 2, 'rip');

    rip.anchor.setTo(0.5, 0.3);
    rip.scale.setTo(0.7, 0.7);
    rip.alpha = 0;
    game.add.tween(rip).to({alpha: 1}, 5000, Phaser.Easing.Linear.None, true, 0, 0, false);

    this._startButton = this.add.button(920, 550, 'startButton', this.startGame);
    this._startButton.scale.setTo(0.8, 0.8);
  }

  startGame() {
    this.game.sound.stopAll();
    this.game.state.start(FirstLevel.STATE_NAME);
  }

}

export default GameOverState;
