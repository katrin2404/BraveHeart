const boss = {
  direction: true,
  alive: true,
  attack: true,
  health: null,
  healthText: null,

  create(self, game) {
    self.boss = game.add.sprite(game.width + 150, 300, 'boss');
    self.boss.scale.setTo(0.8, 0.8);
    game.physics.arcade.enable(self.boss);

    self.boss.animations.add('right', [8, 9, 10, 11, 12, 13], 15, true);
    self.boss.animations.add('attack-right', [8, 9, 10, 11, 12, 13, 24, 25, 26, 27, 28, 29, 30, 31], 12, true);

    self.boss.animations.play('right');
    self.boss.speed = -50;
    self.boss.body.velocity.x = self.boss.speed;
    self.boss.body.gravity.y = 1000;
    self.boss.body.collideWorldBounds = true;

    //  Create the health to boss
    self.boss.health = 100;
    self.boss.healthText = game.add.text(600, 70, `Health: ${self.boss.health}`, {
      font: '30px FrakturInk',
      fill: 'rgb(192, 192, 192)',
    });
    self.boss.healthText.fixedToCamera = true;
  },

  update(self, game) {
    let hitPlatform = game.physics.arcade.collide(self.boss, self.layer);
    if (self.boss.body.onFloor() && hitPlatform) {
      self.boss.animations.play('attack-right');
    }

    // check the moment of attack
    for (let i = 0; i < self.boss.animations.currentAnim._frames.length; i++) {
      self.boss.animations.play('attach-right');
      if (self.boss.animations.currentAnim._frames[i] === 24) {
        self.boss.attack = true;
      } else if (self.boss.animations.currentAnim._frames[i] === 8) {
        self.boss.attack = false;
      }
    }
  },
};

export default boss;
