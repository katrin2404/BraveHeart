function switchLevel(currentLevel, nextLevel, coordinate, params = {}) {
  if (currentLevel.player.position.x > coordinate) {
    currentLevel.music.stop();
    currentLevel.game.state.start(nextLevel, true, false, params);
  }

}

export default switchLevel;
