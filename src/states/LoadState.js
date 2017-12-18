import {Phaser} from '../preloaders/phaser';
import MenuState from '../states/MenuState';

class LoadState extends Phaser.State {

  static get STATE_NAME() {
    return 'load';
  }

  constructor() {
    super();
  }

  preload(game) {
    //  Creating the background
    this._background = this.add.tileSprite(0, 0, game.width, 690, 'loadingBackground');

    //  Creating the 'Loading...' caption
    this.healthText = game.add.text(game.world.centerX - 180, game.world.centerY - 80, 'Loading...', {
      font: '100px FrakturInk',
      fill: '#233b20',
    });

    //  Creating the loading Bar
    this.preloadBar = game.add.sprite(50, game.world.centerY + 150, 'preloadBar');
    game.load.setPreloadSprite(this.preloadBar);

    //  Load backgrounds
    game.load.image('background', '../assets/images/backgrounds/backgroundMenu.jpg');
    game.load.image('gameBackgroundLevel1', '../assets/images/backgrounds/backgroundLevel1.png');
    game.load.image('gameBackgroundLevel2', '../assets/images/backgrounds/backgroundLevel2.png');
    game.load.image('gameBackgroundLevel3', '../assets/images/backgrounds/backgroundLevel3.png');

    //  Load manager buttons
    game.load.spritesheet('startButton', '../assets/images/buttons/startButton.png');
    game.load.spritesheet('play-pause', '../assets/images/buttons/play-pause.png');
    game.load.image('pause', '../assets/images/buttons/pause.png');
    game.load.image('play', '../assets/images/buttons/play.png');

    game.load.image('paper', '../assets/images/paper.png');
    game.load.image('hud', '../assets/images/hud.png');
    game.load.image('coat', '../assets/images/coat.png');
    game.load.image('rip', '../assets/images/rip.png');
    game.load.image('arrow', '../assets/images/arrow.png');

    //  Load enemies
    game.load.image('potion', '../assets/images/enemies/potion.png');
    game.load.image('ghost', '../assets/images/enemies/ghost.png');
    game.load.spritesheet('bat', '../assets/images/enemies/bats.png', 164, 135);
    game.load.image('mirror', '../assets/images/enemies/mirror.png');

    //  Load bonuses
    game.load.spritesheet('diamond', '../assets/images/bonuses/diamonds_sprite.png', 110, 112);
    game.load.image('skull', '../assets/images/bonuses/skull.png');

    //  Load main character
    game.load.spritesheet('player', '../assets/images/characters/hero.png', 134, 176);
    game.load.spritesheet('boss', '../assets/images/characters/boss.png', 252, 176);
    game.load.spritesheet('spearman', '../assets/images/characters/spearman.png', 252, 176);

    // Load win images
    game.load.image('win', '../assets/images/win/win.png');
    game.load.image('win1', '../assets/images/win/win1.png');
    game.load.image('win2', '../assets/images/win/win2.png');

    //  Load the first level
    game.load.tilemap('map', '../assets/maps/first-level/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', '../assets/images/tilesets/tileset.png');

    //  Load the second level
    game.load.tilemap('dark-map', '../assets/maps/second-level/map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('dark-tileset', '../assets/images/tilesets/dark-tileset.png');

    //  Load the boss level map
    game.load.tilemap('boss-map', '../assets/maps/boss-level/map.json', null, Phaser.Tilemap.TILED_JSON);

    //  Load level's sounds
    game.load.audio('stream', '../assets/sounds/levels-music/stream.mp3');
    game.load.audio('night', '../assets/sounds/levels-music/night.mp3');
    game.load.audio('ghosts', '../assets/sounds/levels-music/ghosts.mp3');
    game.load.audio('fight', '../assets/sounds/levels-music/fight.mp3');
    game.load.audio('bastard', '../assets/sounds/levels-music/bastard.mp3');
    game.load.audio('win', '../assets/sounds/levels-music/victory.mp3');
    game.load.audio('firework', '../assets/sounds/levels-music/firework.mp3');
    game.load.audio('death', '../assets/sounds/levels-music/death.mp3');
  }

  create(game) {
    game.state.start(MenuState.STATE_NAME);
  }

}

export default LoadState;
