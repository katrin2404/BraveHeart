const music = {
  create: function (self, game, sound, volume = 0.3) {
    self.music = game.add.audio(sound, volume, true);
    self.music.play();
  },
};

export default music;
