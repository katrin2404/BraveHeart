import { increaseScore } from '../utils/utils';

let bonusesSkull = {
  create(level, game) {
    level.bonusesSkull = level.add.group();
    level.bonusesSkull.enableBody = true;

    for (let i = 0; i < 4; i++) {
      let bonusSkull = level.bonusesSkull.create((250 + (i * 500)), game.world.height - 200, 'skull');
      game.physics.arcade.enable(bonusSkull);
      bonusSkull.scale.setTo(0.4, 0.4);
      bonusSkull.speed = 0;

      //  Let speed do its thing
      bonusSkull.body.velocity.x = bonusSkull.speed;
      bonusSkull.body.gravity.y = 200;
    }

  },

  update(level, game) {
    //  Collide the falling enemies with the platforms
    level.physics.arcade.collide(level.bonusesSkull, level.layer, null, (skull) => !skull._isKilled);
    level.physics.arcade.collide(level.bonusesSkull, level.bonusesSkull);
    level.physics.arcade.collide(level.bonusesSkull, level.player, destroySkull);
  },
};

function destroySkull(player, skull) {
  //player has jumped above the skull
  if (skull.position.y - player.position.y > 120 && !skull._isKilled && player.body.velocity.y > 200) {
    increaseScore(player.game, 200);
    skull._isKilled = true;
    skull.body.gravity.y = 800;
  }
}

export default bonusesSkull;
