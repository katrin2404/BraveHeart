import pause from '../utils/pause';
import firstMap from '../maps/firstMap';
import switchLevel from '../utils/switchLevel';
import player from '../units/player';
import diamonds from '../units/bonusesDiamond';
import score from '../utils/score';
import SecondLevel from './SecondLevel';
import {Phaser} from '../preloaders/phaser';
import music from '../music/music';

class FirstLevel extends Phaser.State {

  static get STATE_NAME() {
    return 'firstLevel';
  }

  constructor() {
    super();
  }

  init(params) {
    this.score = 0;
  }

  create(game) {
    //  Create background
    this._background = this.add.tileSprite(0, -50, game.width, 690, 'gameBackgroundLevel1');
    this._background.fixedToCamera = true;

    //  Create the arrow pointer image, that point to the next level
    this._arrow = this.add.tileSprite(4780, 220, 260, 260, 'arrow');
    this._arrow.scale.setTo(0.7, 0.7);

    //  Create level music
    music.create(this, game, 'stream');

    //  The score
    score.create(this, game);

    //  Pause buttons
    pause.create(this);

    //  Create player
    player.create(this, game);


    //  Create map
    firstMap.create(this, game);

    //  Create bonuses
    diamonds.create(this, game);

    //  Create control buttons for the player
    this.cursors = game.input.keyboard.createCursorKeys();
  }

  update(game) {
    this._background.tilePosition.x = -game.camera.position.x / 10;
    player.update(this, game);
    diamonds.update(this, game);

    //  Switching to the second level
    switchLevel(this, SecondLevel.STATE_NAME, 4800, {score: this.score});
  }
}

export default FirstLevel;
