import GameOverState from '../states/GameOverState';
import music from '../music/music';

const spearman = {
  direction: true,
  alive: true,
  health: null,
  healthText: null,
  attack: false,

  create: function (self, game) {

    self.spearman = game.add.sprite(200, 200, 'spearman');
    self.spearman.scale.setTo(0.8, 0.8);
    game.physics.arcade.enable(self.spearman);

    self.spearman.body.bounce.y = 0.2;
    self.spearman.body.gravity.y = 2000;

    //  Add a walking animation to the right and left
    self.spearman.animations.add('right', [0, 1, 2, 3, 4, 5], 15, true);
    self.spearman.animations.add('left', [8, 9, 10, 11, 12, 13], 15, true);
    self.spearman.animations.add('stop-right', [5, 0], 2, true);
    self.spearman.animations.add('stop-left', [13, 8], 2, true);
    self.spearman.animations.add('fight-right', [16, 17, 18, 19, 20, 21, 22, 23], 10, true);
    self.spearman.animations.add('fight-left', [24, 25, 26, 27, 28, 29, 30, 31], 15, true);
    self.spearman.animations.add('death-right', [14, 15, 16, 17, 18, 19, 20, 20, 20, 20, 20, 20, 20, 20], 6, true);
    self.spearman.animations.add('death-left', [27, 26, 25, 24, 23, 22, 21, 21, 21, 21, 21, 21, 21, 21], 6, true);

    //Spearman killed
    self.spearman.events.onKilled.add(() => self.game.state.start(GameOverState.STATE_NAME));

    //  Set the camera to follow the spearman
    game.camera.follow(self.spearman);

    //  Add the health to spearman
    self.spearman.health = 100;

    //  Create the healthText
    self.spearman.healthText = game.add.text(250, 70, `Health: ${self.spearman.health}`, {
      font: '30px FrakturInk',
      fill: 'rgb(160, 145, 70)',
    });
    self.spearman.healthText.fixedToCamera = true;
  },

  update: function (self, game) {
    let hitPlatform = game.physics.arcade.collide(self.spearman, self.layer);
    self.spearman.body.drag.set(1000);

    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      self.game.sound.stopAll();
      music.create(self, game, 'bastard');
    }

    if (self.cursors.left.isDown && self.cursors.down.isDown) {
      self.spearman.body.velocity.x = -300;
      this.direction = false;
      self.spearman.animations.play('fight-left');
      self.spearman.attack = true;

    } else if (self.cursors.right.isDown && self.cursors.down.isDown) {
      self.spearman.body.velocity.x = +300;
      this.direction = false;
      self.spearman.animations.play('fight-right');
      self.spearman.attack = true;

    } else if (self.cursors.left.isDown) {
      self.spearman.body.velocity.x = -300;
      self.spearman.animations.play('left');
      this.direction = false;
      self.spearman.attack = false;

    } else if (self.cursors.right.isDown) {
      self.spearman.body.velocity.x = +300;
      self.spearman.animations.play('right');
      this.direction = true;
      self.spearman.attack = false;

    } else if (self.cursors.down.isDown) {
      self.spearman.animations.play(this.direction ? 'fight-right' : 'fight-left');
      self.spearman.attack = true;

    } else {
      if (this.alive) {
        self.spearman.animations.play(this.direction ? 'stop-right' : 'stop-left');
      }
      self.spearman.attack = false;
    }

    //  Allow the spearman to jump if they are touching the ground.
    if (self.cursors.up.isDown && self.spearman.body.onFloor() && hitPlatform) {
      self.spearman.animations.stop();
      self.spearman.body.velocity.y = -800;
      self.spearman.attack = false;
    }

    this.deathUnderScreen(self, game, 1000);
  },

  delayedDeath: function (self, game, delay) {
    this.alive = false;
    self.spearman.attack = false;
    self.spearman.animations.play(this.direction ? 'death-right' : 'death-left');

    if (!self.timer) {
      self.timer = game.time.now + delay;
    } else {
      if (self.timer <= game.time.now) {
        self.spearman.kill();
      }
    }
  },

  deathUnderScreen(self, game, delay = 0) {
    if (self.spearman.position.y > 500) {
      this.delayedDeath(self, game, delay);
    }
  },
};

export default spearman;
