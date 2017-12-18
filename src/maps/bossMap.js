const bossMap = {
  create: function (self, game) {
    let map = game.add.tilemap('boss-map');
    map.addTilesetImage('dark-tileset');

    map.setCollision([5, 16, 17, 18]);
    self.layer = map.createLayer('Tile Layer 1');
    self.layer.resizeWorld();
  },

  update: function (self) {

  },
};

export default bossMap;
