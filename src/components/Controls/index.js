import React from 'react';
import {
  useRandomness,
  useLearningRate,
  useDiscountFactor,
  useExplorationRate,
  useStart
} from '../../logic';
import { Slider } from '..';
import styles from './index.module.css';

function Controls() {
  const [randomness, setRandomness] = useRandomness();
  const [learningRate, setLearningRate] = useLearningRate();
  const [discountFactor, setDiscountFactor] = useDiscountFactor();
  const [explorationRate, setExplorationRate] = useExplorationRate();
  const [onStart] = useStart();

  return (
    <div className={ styles.container }>
      <div className={ styles.sliders }>
        <Slider
          className={ styles.slider }
          label="Randomness"
          value={ randomness }
          onChange={ setRandomness }
        />
        <Slider
          className={ styles.slider }
          label="Learning Rate"
          value={ learningRate }
          onChange={ setLearningRate }
        />
        <Slider
          className={ styles.slider }
          label="Discount Factor"
          value={ discountFactor }
          onChange={ setDiscountFactor }
        />
        <Slider
          className={ styles.slider }
          label="Exploration Rate"
          value={ explorationRate }
          onChange={ setExplorationRate }
        />
      </div>
      <button onClick={ onStart }>
        Start!
      </button>
    </div>
  );
}

export default Controls;
