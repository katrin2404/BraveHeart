import pause from '../utils/pause';
import bossMap from '../maps/bossMap';
import spearman from '../units/spearman';
import boss from '../units/boss';
import WinState from '../states/WinState';
import {Phaser} from '../preloaders/phaser';
import score from '../utils/score';
import {increaseScore} from "../utils/utils";
import music from '../music/music';

class BossLevel extends Phaser.State {

  static get STATE_NAME() {
    return 'bossLevel';
  }

  constructor() {
    super();
  }

  init(params) {
    this.score = 0;
  }

  create(game) {
    //  Create background
    this._background = this.add.tileSprite(0, -50, game.width, 690, 'gameBackgroundLevel3');
    this._background.fixedToCamera = true;

    //  Create level music
    music.create(this, game, 'fight');

    /*    //  Create score
        score.create(this, game);*/

    //  Create pause button
    pause.create(this);

    //  Create the healthHud
    this.hud = game.add.image(100, 10, 'hud');
    this.hud.scale.setTo(1.3, .3);
    this.hud.fixedToCamera = true;

    this.coat = game.add.image(400, 10, 'coat');
    this.coat.scale.setTo(0.3, 0.3);
    this.coat.fixedToCamera = true;


    //  Create spearman
    spearman.create(this, game);

    //  Create boss
    boss.create(this, game);

    //  Create map
    bossMap.create(this, game);

    //  Create control buttons for the spearman
    this.cursors = game.input.keyboard.createCursorKeys();

  }

  update(game) {
    this._background.tilePosition.x = -game.camera.position.x / 10;
    spearman.update(this, game);
    boss.update(this, game);

    //Win!
    if (this.spearman.position.x > 2110) {
      this.game.sound.stopAll();
      game.state.start(WinState.STATE_NAME);
    }
    game.physics.arcade.overlap(this.spearman, this.boss, fight, checkDistance, this);

  }
}

function fight(spearman, boss) {
  //  If the characters beat
  if (spearman.attack) {
    boss.health--;
    checkHealth(boss);

    spearman.body.velocity.x = 0;
    boss.body.velocity.x = 800;
    boss.body.drag.set(1000);

    boss.healthText.text = 'Health: ' + boss.health;

  } else if (!spearman.attack && boss.attack) {
    spearman.health--;
    checkHealth(spearman);

    boss.body.velocity.x = 0;
    spearman.body.velocity.x = -800;

    spearman.healthText.text = 'Health: ' + spearman.health;
  }
}

function checkDistance(spearman, boss) {
  return boss.position.x - spearman.position.x <= 95;
}

function checkHealth(unit) {
  if (unit.health <= 0) {
    unit.kill();
  }
}


export default BossLevel;
