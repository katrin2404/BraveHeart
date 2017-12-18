import pause from '../utils/pause';
import secondMap from '../maps/secondMap';
import switchLevel from '../utils/switchLevel';
import player from '../units/player';
import enemiesPotion from '../units/enemiesPotion';
import bonusesSkull from '../units/bonusesSkull';
import enemiesBat from '../units/enemiesBat';
import score from '../utils/score';
import {Phaser} from '../preloaders/phaser';
import music from '../music/music';
import ThirdLevel from './ThirdLevel';

class SecondLevel extends Phaser.State {

  static get STATE_NAME() {
    return 'secondLevel';
  }

  constructor() {
    super();
  }

  init(params) {
    this.score = params.score;
  }

  create(game) {
    //  Create background
    this._background = this.add.tileSprite(0, -50, game.width, 690, 'gameBackgroundLevel2');
    this._background.fixedToCamera = true;

    //  The score
    score.create(this, game);

    //  Pause buttons
    pause.create(this);

    //  Create player
    player.create(this, game);

    //  Create map
    secondMap.create(this, game);

    //  Create enemies
    bonusesSkull.create(this, game);
    enemiesPotion.create(this, game);
    enemiesBat.create(this, game);

    //  Create level music
    music.create(this, game, 'night');

    //  Create control buttons for the player
    this.cursors = game.input.keyboard.createCursorKeys();
  }

  update(game) {
    this._background.tilePosition.x = -game.camera.position.x / 10;
    player.update(this, game);
    bonusesSkull.update(this, game);
    enemiesBat.update(this, game);
    enemiesPotion.update(this, game);

    //  Switching to the second level
    switchLevel(this, ThirdLevel.STATE_NAME, 4950, {score: this.score});
  }
}

export default SecondLevel;
