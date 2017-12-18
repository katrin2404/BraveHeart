import GameOver from '../states/GameOverState';

const player = {
  direction: true,
  alive: true,

  create(self, game) {

    self.player = game.add.sprite(200, 200, 'player');
    self.player.scale.setTo(0.8, 0.8);
    game.physics.arcade.enable(self.player);

    self.player.body.bounce.y = 0.2;
    self.player.body.gravity.y = 2000;
    self.player.body.collideWorldBounds = true;
    game.physics.arcade.collideBottom = false;

    //  Add a walking animation to the right and left
    self.player.animations.add('right', [0, 1, 2, 3, 4, 5, 6], 15, true);
    self.player.animations.add('left', [7, 8, 9, 10, 11, 12, 13], 15, true);
    self.player.animations.add('stop-right', [6, 0], 2, true);
    self.player.animations.add('stop-left', [13, 7], 2, true);
    self.player.animations.add('death-right', [14, 15, 16, 17, 18, 19, 20, 20, 20, 20, 20, 20, 20, 20], 6, true);
    self.player.animations.add('death-left', [27, 26, 25, 24, 23, 22, 21, 21, 21, 21, 21, 21, 21, 21], 6, true);

    //Player killed
    self.player.events.onKilled.add(() => game.state.start(GameOver.STATE_NAME));

    //  Set the camera to follow the player
    game.camera.follow(self.player);
  },

  update(self, game) {
    let hitPlatform = game.physics.arcade.collide(self.player, self.layer);
    self.player.body.velocity.x = 0;

    if (self.cursors.left.isDown) {
      self.player.body.velocity.x = -300;
      self.player.animations.play('left');
      this.direction = false;

    } else if (self.cursors.right.isDown) {
      self.player.body.velocity.x = +300;
      self.player.animations.play('right');
      this.direction = true;

    } else {
      self.player.body.velocity.x = 0;
      if (this.alive) {
        self.player.animations.play(this.direction ? 'stop-right' : 'stop-left');
      }
    }

    //  Allow the player to jump if they are touching the ground.
    if (self.cursors.up.isDown && self.player.body.onFloor() && hitPlatform) {
      self.player.animations.stop();
      self.player.body.velocity.y = -800;
    }

    this.deathUnderScreen(self, game, 1000);
  },

  delayedDeath(self, game, delay) {
    this.alive = false;
    self.player.animations.play(this.direction ? 'death-right' : 'death-left');

    if (!self.timer) {
      self.timer = game.time.now + delay;
    } else {
      if (self.timer <= game.time.now) {
        self.player.kill();
      }
    }
  },

  deathUnderScreen(self, game, delay = 0) {
    if (self.player.position.y > 450) {
      self.player.body.collideWorldBounds = false;
      this.delayedDeath(self, game, delay);
    }
  },
};

export default player;
