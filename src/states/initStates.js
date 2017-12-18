import BootState from './BootState';
import LoadState from './LoadState';
import MenuState from './MenuState';
import WinState from './WinState';
import GameOverState from './GameOverState';

import FirstLevel from '../levels/FirstLevel';
import SecondLevel from '../levels/SecondLevel';
import ThirdLevel from '../levels/ThirdLevel';
import BossLevel from '../levels/BossLevel';

//  Game States
const states = [
  BootState,
  LoadState,
  MenuState,
  GameOverState,
  WinState,
];

//  Levels
const levels = [
  FirstLevel,
  SecondLevel,
  ThirdLevel,
  BossLevel,
];

export default function initStates(game) {
  //add each game state
  states.forEach((state) => game.state.add(state.STATE_NAME, state));

  //add game levels
  levels.forEach((level) => game.state.add(level.STATE_NAME, level));

  //and start boot state
  game.state.start(BootState.STATE_NAME);

  return game;
}
