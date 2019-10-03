import React, {
  createContext,
  useContext,
  useState
} from 'react';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider, useDrag, useDrop } from 'react-dnd';

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
  const [value, setValue] = useState(initialState());
  const m = (...args) => setValue(move(value, ...args))

  return (
    <DndProvider backend={ HTML5Backend }>
      <Context.Provider value={{ value, move: m }}>
        { children }
      </Context.Provider>
    </DndProvider>
  );
}

MapProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useMap() {
  const { value } = useContext(Context);
  return [value];
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
  const { value, move } = useContext(Context);
  const state = value[i][j];

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
