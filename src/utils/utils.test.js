import {expect} from 'chai';
import sinon from 'sinon';
import {increaseScore} from './utils';

describe('utils', () => {

  describe('increaseScore', () => {
    const initialScore = 100;
    const score = 100;
    let game;

    beforeEach(() => {
      game = {
        state: {
          currentState: {
            score: initialScore,
            scoreText: {
              text: undefined,
            },
          },
          getCurrentState: sinon.spy(() => game.state.currentState),
        },
      };
    });

    it('increases the score', () => {
      increaseScore(game, score);
      expect(game.state.currentState.score).to.equal(score + initialScore);
    });

    it('invokes game.state.getCurrentState', () => {
      increaseScore(game, score);
      expect(game.state.getCurrentState.called).to.equal(true);
    });

    it('fills scoreText.text', () => {
      increaseScore(game, score);
      expect(game.state.currentState.scoreText.text).to.equal(`Score: ${score + initialScore}`);
    });

    it('can be applied multiple times', () => {
      increaseScore(game, score);
      increaseScore(game, score);
      expect(game.state.currentState.score).to.equal(initialScore + score + score);
    });
  });

});

