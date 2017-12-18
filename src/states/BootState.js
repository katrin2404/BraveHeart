import { Phaser } from '../preloaders/phaser';
import LoadState from './LoadState';

class BootState extends Phaser.State {

  static get STATE_NAME() {
    return 'boot';
  }

  constructor() {
    super();
  }

  init(game) {
    this.scale.scaleMod = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  }

  preload(game) {
    game.load.image('preloadBar', '../assets/images/loading.png');
    game.load.image('loadingBackground', '../assets/images/backgrounds/backgroundLoading.jpg');
  }

  create(game) {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.state.start(LoadState.STATE_NAME);
  }
}

export default BootState;
