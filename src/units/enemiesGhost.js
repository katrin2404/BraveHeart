const enemiesGhost = {
  create(gameState, game) {
    game.enemiesGhost = gameState.add.group();

    //  We will enable physics for any ghost that is created in this group
    game.enemiesGhost.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    game.time.events.loop(4000, function () {
      const enemyGhost = game.enemiesGhost.create(game.camera.position.x + 1120, -1, 'ghost');
      enemyGhost.scale.setTo(0.7, 0.7);

      //  Let gravity  and speed do its thing
      enemyGhost.speed = -300;
      enemyGhost.body.velocity.x = enemyGhost.speed;
      enemyGhost.body.gravity.y = 60;
    });

  },
  update(gameState, game) {
    gameState.physics.arcade.collide(game.enemiesGhost, game.enemiesGhost);
    gameState.physics.arcade.collide(game.enemiesGhost, gameState.layer, crashGhost, null, this);
    gameState.physics.arcade.overlap(game.enemiesGhost, gameState.player, crashHero, null, this);
  },

};

function crashGhost(ghost) {
  ghost.kill();
}

function crashHero(ghost) {
  ghost.kill();
}

export default enemiesGhost;
