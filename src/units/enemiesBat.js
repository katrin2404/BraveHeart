const enemiesBat = {
  create(gameState, game) {
    window.game = game;

    game.enemiesBat = gameState.add.group();

    //  We will enable physics for any ghost that is created in this group
    game.enemiesBat.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    game.time.events.loop(3000, function () {
      const enemyBat = game.enemiesBat.create(game.camera.position.x + 1120, -1, 'bat');
      enemyBat.scale.setTo(0.7, 0.7);
      enemyBat.animations.add('fly-bat', [0, 1, 2, 3], 10, true);

      //  Let gravity  and speed do its thing
      enemyBat.animations.play('fly-bat');
      enemyBat.speed = -300;
      enemyBat.body.velocity.x = enemyBat.speed;
      enemyBat.body.gravity.y = 80;

    });

  },

  update(gameState, game) {
    gameState.physics.arcade.collide(game.enemiesBat, game.enemiesBat);
    gameState.physics.arcade.overlap(game.enemiesBat, gameState.player, crashHero, null, this);
  },
};

function crashHero(bat) {
  bat.kill();
}

export default enemiesBat;
