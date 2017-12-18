const firstMap = {
  create: function (self, game) {
    let map = game.add.tilemap('map');
    map.addTilesetImage('tileset');

    map.setCollision([1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18]);
    self.layer = map.createLayer('Tile Layer 1');
    self.layer.resizeWorld();
  },

  update: function (self) {

  },
};

export default firstMap;
