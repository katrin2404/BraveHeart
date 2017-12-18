const score = {
  scoreText: null,
  create: function (level, game) {
    //  The score
    level.hud = game.add.image(10, 10, 'paper');
    level.hud.scale.setTo(0.4, 0.3);
    level.hud.fixedToCamera = true;
    level.score = level.score || 0;
    level.scoreText = game.add.text(60, 40, `Score: ${level.score}`, {
      font: '26px FrakturInk',
      fill: '#503525',
    });
    level.scoreText.fixedToCamera = true;
  },
};

export default score;
