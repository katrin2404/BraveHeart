import game from '../index';
import config from '../constans/config';

let pause = {
  create: function (self) {

    //  Create the play-pause buttons
    self.pause = game.add.image(config.width - 100, 20, 'pause');
    self.pause.scale.setTo(0.7, 0.7);
    self.play = game.add.image(config.width - 100, 20, 'play');
    self.play.scale.setTo(0.7, 0.7);
    self.play.alpha = 0;

    self.pause.fixedToCamera = true;
    self.pause.inputEnabled = true;
    self.play.fixedToCamera = true;


    //  When the paus buttons is pressed, we pause the game
    self.pause.events.onInputUp.add(function () {
      if (!game.paused) {
        game.paused = true;
        self.play.alpha = 1;
        self.pause.alpha = 0;
        /*        self.pause.text = 'Play';*/
      } else {
        game.paused = false;
        self.play.alpha = 0;
        self.pause.alpha = 1;
        /*        self.pause.text = 'Pause';*/

      }
    });
  },
};

export default pause;
