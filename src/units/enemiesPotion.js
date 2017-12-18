import bonusesSkull from './bonusesSkull';

const enemiesPotion = {
  create(level, game) {
    level.enemiesPotion = level.add.group();

    //  We will enable physics for any potions that is created in this group
    level.enemiesPotion.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    for (let i = 0; i < 3; i++) {
      //  Create a potions inside of the 'potion' group
      let enemyPotion = level.enemiesPotion.create((2000 + i * 420), -1, 'potion');
      enemyPotion.scale.setTo(0.7, 0.7);
      enemyPotion.speed = 0;
      game.physics.arcade.enable(enemyPotion);
      enemyPotion.body.gravity.y = 2000;
    }
  },

  update(level, game) {
    level.physics.arcade.collide(level.enemiesPotion, level.layer);
    level.physics.arcade.collide(bonusesSkull, level.enemiesPotion);
    level.physics.arcade.collide(level.enemiesPotion, level.enemiesPotion);
    level.physics.arcade.overlap(bonusesSkull, level.enemiesPotion);
    level.physics.arcade.collide(level.player, level.enemiesPotion, destroyHero);
  },
};

function destroyHero(player, potion) {
  //  Player has jumped above the potion
  if (potion.position.y - player.position.y > 100 && player.body.velocity.y > 150) {
    player.kill();
  }
}

export default enemiesPotion;
