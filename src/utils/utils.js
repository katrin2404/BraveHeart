export function increaseScore(game, score) {
  const currentState = game.state.getCurrentState();
  currentState.score += score;
  currentState.scoreText.text = 'Score: ' + currentState.score;
}
