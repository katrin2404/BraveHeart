const secondMap = {
  create: function (self, game) {
    let map = game.add.tilemap('dark-map');
    map.addTilesetImage('dark-tileset');

    map.setCollision([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
    self.layer = map.createLayer('Tile Layer 1');
    self.layer.resizeWorld();
  },

  update: function (self) {

  },
};

export default secondMap;
