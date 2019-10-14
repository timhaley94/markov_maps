import config from '../config';
import {
  FINISH,
  PATH,
  PIT,
  WALL,
  RANDOMNESS,
  LEARNING_RATE,
  DISCOUNT_FACTOR,
  EXPLORATION_RATE
} from './symbols';

function getReward(value) {
  switch (value) {
    case FINISH:
      return config.FINISH_REWARD;
    case PATH:
      return config.PATH_REWARD;
    case PIT:
      return config.PIT_REWARD;
    default:
      return config.PATH_REWARD;
  }
}

function getNextState([i, j], a) {
  switch (a) {
    case 0:
      return [i - 1, j];
    case 1:
      return [i, j + 1];
    case 2:
      return [i + 1, j];
    case 3:
      return [i, j - 1];
    default:
      return [i, j];
  }
}

function isLegalState(map, [i, j]) {
  if (i < 0 || j < 0) {
    return false;
  }

  if (i >= map.length || j >= map[0].length) {
    return false;
  }

  return map[i][j] !== WALL;
}

export default function createLearner(
  {
    start,
    finish,
    value: map
  },
  {
    [RANDOMNESS]: randomness,
    [LEARNING_RATE]: learningRate,
    [DISCOUNT_FACTOR]: discountFactor,
    [EXPLORATION_RATE]: explorationRate
  }
) {
  const rand = randomness / 100;
  const alpha = learningRate / 100;
  const gamma = discountFactor / 100;
  const er = explorationRate / 100;

  let trialNumber = 0;

  const qValues = map.map(
    (row, i) => row.map(
      (value, j) => [0, 0, 0, 0]
    )
  );

  function selectAction(s) {
    if (Math.random() < er) {
      return Math.floor(Math.random() * 4);
    }

    return (
      qValues[s[0]][s[1]]
        .map((q, i) => ({ q, i }))
        .sort((a, b) => b.q - a.q)[0].i
    );
  }

  function executeAction(s, a) {
    const action = (
      Math.random() < rand
        ? Math.floor(Math.random() * 4)
        : a
    );

    const sPrime = getNextState(s, action);

    return (
      isLegalState(map, sPrime)
        ? sPrime
        : s
    );
  }

  function updateQValue([i, j], a, [iPrime, jPrime], r) {
    const oldValue = qValues[i][j][a];
    const learnedValue = r + (gamma * Math.max(...qValues[iPrime][jPrime]));

    qValues[i][j][a] = ((1 - alpha) * oldValue) + (alpha * learnedValue);
  }

  return {
    attempt: () => {
      trialNumber++;

      let finished = false;
      let stepNumber = 1;
      let s = start;
      let path = [start];
      let totalReward = 0;

      while (!finished && stepNumber < config.MAX_NUMBER_OF_STEPS) {
        stepNumber++;

        const a = selectAction(s);
        const sPrime = executeAction(s, a);

        const v = map[sPrime[0]][sPrime[1]];
        const r = getReward(v);

        updateQValue(s, a, sPrime, r);

        s = sPrime;
        path = [...path, sPrime];
        totalReward = totalReward + r;

        if (v === FINISH || v === PIT) {
          finished = true;
        }
      }

      return {
        path,
        number: trialNumber,
        payout: totalReward
      };
    }
  };
}
