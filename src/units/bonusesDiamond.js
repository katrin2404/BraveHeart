import { increaseScore } from '../utils/utils';

const diamonds = {
  create: function (level, game) {
    level.diamonds = level.add.group();
    level.diamonds.enableBody = true;

    for (let i = 1; i < 25; i++) {
      let diamond = level.diamonds.create(i * 200, 0, 'diamond');
      diamond.scale.setTo(0.3, 0.3);
      game.physics.arcade.enable(diamond);
      diamond.body.gravity.y = 300;
    }

    level.diamonds.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    level.diamonds.callAll('animations.play', 'animations', 'spin');

  },

  update: function (level, game) {
    //  Collide the ghost with the platforms, player
    level.physics.arcade.collide(level.diamonds, level.layer);
    level.physics.arcade.overlap(level.player, level.diamonds, collectDiamonds, null, this);

  },
};

function collectDiamonds(player, diamond) {
  diamond.kill();
  increaseScore(player.game, 100);
}

export default diamonds;
