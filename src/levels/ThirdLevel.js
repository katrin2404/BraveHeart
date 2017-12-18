import pause from '../utils/pause';
import secondMap from '../maps/secondMap';
import player from '../units/player';
import enemiesGhost from '../units/enemiesGhost';
import enemyMirror from '../units/enemiesMirror';
import bonuses from '../units/bonusesDiamond';
import score from '../utils/score';
import BossLevel from '../levels/BossLevel';
import {Phaser} from '../preloaders/phaser';
import music from '../music/music';
import switchLevel from "../utils/switchLevel";

class ThirdLevel extends Phaser.State {

  static get STATE_NAME() {
    return 'thirdLevel';
  }

  constructor() {
    super();
  }

  init(params) {
    this.score = params.score;
  }

  create(game) {
    //  Create background
    this._background = this.add.tileSprite(0, -50, game.width, 690, 'gameBackgroundLevel3');
    this._background.fixedToCamera = true;

    //  Create level music
    music.create(this, game, 'ghosts', 0.7);

    //  The score
    score.create(this, game);

    //  Pause buttons
    pause.create(this);

    //  Create map
    secondMap.create(this, game);

    //  Create enemies
    enemyMirror.create(this, game);
    enemiesGhost.create(this, game);

    //  Create player
    player.create(this, game);
    //  Create bonuses
    bonuses.create(this, game);

    //  Create control buttons for the player
    this.cursors = game.input.keyboard.createCursorKeys();
  }

  update(game) {
    this._background.tilePosition.x = -game.camera.position.x / 10;
    player.update(this, game);
    enemiesGhost.update(this, game);
    enemyMirror.update(this);
    bonuses.update(this, game);

    //  Switching to the second level
    switchLevel(this, BossLevel.STATE_NAME, 5000, {score: this.score});
  }

}

export default ThirdLevel;
