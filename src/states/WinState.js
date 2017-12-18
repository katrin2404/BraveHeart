import { Phaser } from '../preloaders/phaser';
import config from '../constans/config';
import FirstLevel from '../levels/FirstLevel';
import music from '../music/music';

let max = 0;
let frontEmitter;
let midEmitter;
let backEmitter;
let updateInterval = 4 * 60;
let i = 0;

class WinState extends Phaser.State {
  static get STATE_NAME() {
    return 'win';
  }

  static changeWindDirection() {

    let multi = Math.floor((max + 200) / 4);
    let frag = (Math.floor(Math.random() * 100) - multi);
    max = max + frag;

    if (max > 200) max = 150;
    if (max < -200) max = -150;

    WinState.setXSpeed(backEmitter, max);
    WinState.setXSpeed(midEmitter, max);
    WinState.setXSpeed(frontEmitter, max);
  }

  static setXSpeed(emitter, max) {
    emitter.setXSpeed(max - 20, max);
    emitter.forEachAlive(WinState.setParticleXSpeed, this, max);
  }

  static setParticleXSpeed(particle, max) {
    particle.body.velocity.x = max - Math.floor(Math.random() * 30);
  }

  constructor() {
    super();
  }

  create(game) {
    this._background = this.add.tileSprite(0, -50, config.width, 690, 'background');

    //  Create the win musics
    music.create(this, game, 'win', 0.7);
    music.create(this, game, 'firework', 0.7);

    //Win effect
    backEmitter = game.add.emitter(game.world.centerX, -32, 600);
    backEmitter.makeParticles('win1');
    backEmitter.maxParticleScale = 0.6;
    backEmitter.minParticleScale = 0.2;
    backEmitter.setYSpeed(10, 50);
    backEmitter.gravity = 0;
    backEmitter.width = game.world.width * 1.5;
    backEmitter.minRotation = 0;
    backEmitter.maxRotation = 40;

    midEmitter = game.add.emitter(game.world.centerX, -32, 250);
    midEmitter.makeParticles('win2');
    midEmitter.maxParticleScale = 1;
    midEmitter.minParticleScale = 0.5;
    midEmitter.setYSpeed(20, 60);
    midEmitter.gravity = 0;
    midEmitter.width = game.world.width;
    midEmitter.minRotation = 0;
    midEmitter.maxRotation = 20;

    frontEmitter = game.add.emitter(game.world.centerX, -32, 50);
    frontEmitter.makeParticles('win1');
    frontEmitter.maxParticleScale = 1;
    frontEmitter.minParticleScale = 0.5;
    frontEmitter.setYSpeed(100, 200);
    frontEmitter.gravity = 0;
    frontEmitter.width = game.world.width * 1.5;
    frontEmitter.minRotation = 0;
    frontEmitter.maxRotation = 20;

    WinState.changeWindDirection();

    backEmitter.start(false, 10000, 20);
    midEmitter.start(false, 1000, 40);
    frontEmitter.start(false, 10000, 1000);

    this._win = this.add.tileSprite(350, 300, 500, 530, 'win');
    this._win.scale.setTo(0.6, 0.6);
    this._startButton = this.add.button(920, 550, 'startButton', this.startGame);
    this._startButton.scale.setTo(0.8, 0.8);
  }

  update(game) {
    i++;
    if (i === updateInterval) {
      WinState.changeWindDirection();
      updateInterval = Math.floor(Math.random() * 20) * 60;
      i = 0;
    }
  }

  startGame() {
    this.game.sound.stopAll();
    this.game.state.start(FirstLevel.STATE_NAME);
  }
}

export default WinState;
