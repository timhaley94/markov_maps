import React, {
  createContext,
  useContext,
  useRef,
  useState
} from 'react';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import config from '../config';
import useInterval from './useInterval';
import createLearner from './learner';

export const START = Symbol('start');
export const FINISH = Symbol('finish');
export const PATH = Symbol('path');
export const WALL = Symbol('wall');
export const PIT = Symbol('pit');

function range(n) {
  return [...Array(n)];
}

function initialState() {
  const map = (
    range(8).map(
      () => range(8).map(
        () => PATH
      )
    )
  );

  map[0][7] = FINISH;
  map[7][0] = START;

  return map;
}

function copy(map) {
  return map.map(
    row => [...row]
  );
}

function move(map, { value, to, from }) {
  const m = copy(map);

  m[to[0]][to[1]] = value;

  if (from) {
    m[from[0]][from[1]] = PATH;
  }

  return m;
}

const Context = createContext(null);

export function MapProvider({ children }) {
  const [map, setMap] = useState(initialState());

  const [randomness, setRandomness] = useState(config.DEFAULT_RANDOMNESS);
  const [learningRate, setLearningRate] = useState(config.DEFAULT_LEARNING_RATE);
  const [discountFactor, setDiscountFactor] = useState(config.DEFAULT_DISCOUNT_FACTOR);
  const [explorationRate, setExplorationRate] = useState(config.DEFAULT_EXPLORATION_RATE);

  const [isRunning, setIsRunning] = useState(false);
  const [trials, setTrials] = useState([]);
  const learner = useRef(null);

  useInterval(() => {
    if (isRunning && learner.current) {
      const { shouldStop, trial } = learner.current.attempt();

      setTrials([...trials, trial]);

      if (shouldStop) {
        setIsRunning(false);
      }
    }
  });

  const start = () => {
    setIsRunning(true);
    learner.current = createLearner({
      map,
      randomness,
      learningRate,
      discountFactor,
      explorationRate
    });
  };

  const v = {
    map,
    move: (...args) => setMap(move(map, ...args)),
    randomness,
    setRandomness,
    learningRate,
    setLearningRate,
    discountFactor,
    setDiscountFactor,
    explorationRate,
    setExplorationRate,
    trials,
    isRunning,
    start
  };

  return (
    <DndProvider backend={ HTML5Backend }>
      <Context.Provider value={ v }>
        { children }
      </Context.Provider>
    </DndProvider>
  );
}

MapProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useMap() {
  const { map } = useContext(Context);
  return [map];
}

export function useRandomness() {
  const { randomness, setRandomness } = useContext(Context);
  return [randomness, setRandomness];
}

export function useLearningRate() {
  const { learningRate, setLearningRate } = useContext(Context);
  return [learningRate, setLearningRate];
}

export function useDiscountFactor() {
  const { discountFactor, setDiscountFactor } = useContext(Context);
  return [discountFactor, setDiscountFactor];
}

export function useExplorationRate() {
  const { explorationRate, setExplorationRate } = useContext(Context);
  return [explorationRate, setExplorationRate];
}

export function useStart() {
  const { start } = useContext(Context);
  return [start];
}

export function useTrials() {
  const { trials } = useContext(Context);
  return [trials];
}

export function useElement({ i, j, value }) {
  const [, ref] = useDrag({
    item: {
      i,
      j,
      type: value
    },
  });

  return [ref];
}

export function useCell(i, j) {
  const { map, move } = useContext(Context);
  const state = map[i][j];

  const [, ref] = useDrop({
    accept: [START, FINISH, PATH, WALL, PIT],
    drop: ({ i: di, j: dj, type }) => move({
      value: type,
      to: [i, j],
      from: di && dj ? [di, dj] : null
    })
  });

  return [state, ref];
}
