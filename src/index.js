import './styles/main.scss';
import '../assets/favicon.ico';
import { Phaser } from './preloaders/phaser';
import config from './constans/config';
import initStates from './states/initStates';

const game = new Phaser.Game(config.width, config.height, Phaser.AUTO, 'gameDiv');

//init States
initStates(game);

export default game;
