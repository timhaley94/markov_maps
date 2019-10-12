import config from '../config';

export default function createLearner({
  map,
  randomness,
  learningRate,
  discountFactor,
  explorationRate
}) {
  let i = 0;

  return {
    map,
    randomness,
    learningRate,
    discountFactor,
    explorationRate,
    attempt: () => {
      i++;

      return {
        shouldStop: i >= config.MAX_NUMBER_OF_TRIALS,
        trial: {
          number: i,
          payout: (Math.random() * 1000) - 500
        }
      };
    }
  };
}
