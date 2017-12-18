const enemyMirror = {
  create(level, game) {
    level.enemyMirror = game.add.sprite(750, 70, 'mirror');
    game.physics.arcade.enable(level.enemyMirror);
    level.enemyMirror.scale.setTo(1, 1);

  },

  update(level) {
    //  Collide the falling enemies with the platforms
    if (level.player.position.x === 705) {
      level.enemyMirror.body.gravity.y = 5000;
    }
    level.physics.arcade.collide(level.enemyMirror, level.player, destroyHero);
    level.physics.arcade.collide(level.enemyMirror, level.layer);
  }

};

function destroyHero(player, mirror) {
  if (mirror.position.y - player.position.y > 120) {
    player._isKilled = true;
  }
}

export default enemyMirror;
