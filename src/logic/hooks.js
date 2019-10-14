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
import {
  START,
  FINISH,
  PATH,
  WALL,
  PIT,
  RANDOMNESS,
  LEARNING_RATE,
  DISCOUNT_FACTOR,
  EXPLORATION_RATE
} from './symbols';
import defaultMap from './defaultMap';
import createLearner from './learner';
import { useInterval } from './utils';

function move({ value: map, start, finish }, { value, to, from }) {
  const m = map.map(row => [...row]);

  m[to[0]][to[1]] = value;

  let i = null;
  let j = null;
  let newStart = null;
  let newFinish = null;

  if (from) {
    i = from[0];
    j = from[1];
  } else if (value === START) {
    i = start[0];
    j = start[1];
    newStart = [to[0], to[1]];
  } else if (value === FINISH) {
    i = finish[0];
    j = finish[1];
    newFinish = [to[0], to[1]];
  }

  if (Number.isInteger(i) && Number.isInteger(j)) {
    m[i][j] = PATH;
  }

  return {
    value: m,
    start: newStart || start,
    finish: newFinish || finish
  };
}

const Context = createContext(null);

export function MapProvider({ children }) {
  const [map, setMap] = useState(defaultMap);

  const [isRunning, setIsRunning] = useState(false);
  const [trials, setTrials] = useState([]);
  const [parameters, setParameters] = useState({
    [RANDOMNESS]: config.DEFAULT_RANDOMNESS,
    [LEARNING_RATE]: config.DEFAULT_LEARNING_RATE,
    [DISCOUNT_FACTOR]: config.DEFAULT_DISCOUNT_FACTOR,
    [EXPLORATION_RATE]: config.DEFAULT_EXPLORATION_RATE
  });

  const learner = useRef(null);

  useInterval(() => {
    if (isRunning && learner.current) {
      const trial = learner.current.attempt();
      const newTrials = [...trials, trial];

      setTrials(newTrials);

      const lastTrials = newTrials.slice(-10);

      const isConverged = (
        lastTrials.length >= 10
          && lastTrials.every(({ payout }) => payout > config.CONVERGANCE_TEST)
      );

      if (trial.number >= config.MAX_NUMBER_OF_TRIALS || isConverged) {
        setIsRunning(false);
      }
    }
  });

  const start = () => {
    setIsRunning(true);
    setTrials([]);

    learner.current = createLearner(map, parameters);
  };

  const v = {
    map,
    move: (...args) => setMap(move(map, ...args)),
    isRunning,
    start,
    trials,
    parameters,
    setParameter: (key, value) => setParameters({
      ...parameters,
      [key]: value
    })
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
  const { map: { value: map }, trials } = useContext(Context);
  const trial = trials[trials.length - 1];
  return [map, trial ? trial.path : null];
}

function useParameter(key) {
  const { parameters, setParameter } = useContext(Context);
  return [parameters[key], v => setParameter(key, v)];
}

export function useRandomness() {
  return useParameter(RANDOMNESS);
}

export function useLearningRate() {
  return useParameter(LEARNING_RATE);
}

export function useDiscountFactor() {
  return useParameter(DISCOUNT_FACTOR);
}

export function useExplorationRate() {
  return useParameter(EXPLORATION_RATE);
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
  const { map: { value: map }, move } = useContext(Context);
  const state = map[i][j];

  const [, ref] = useDrop({
    accept: [START, FINISH, PATH, WALL, PIT],
    drop: ({ i: di, j: dj, type }) => move({
      value: type,
      to: [i, j],
      from: Number.isInteger(di) && Number.isInteger(dj) ? [di, dj] : null
    })
  });

  return [state, ref];
}
