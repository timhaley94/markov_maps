import {
  START,
  FINISH,
  PATH,
  WALL,
  PIT
} from './symbols';

function range(n) {
  return [...Array(n)];
}

const map = (
  range(8).map(
    () => range(8).map(
      () => PATH
    )
  )
);

map[7][0] = START;
map[0][7] = FINISH;

const walls = [
  [2, 2],
  [3, 2],
  [4, 2],
  [5, 2],
  [2, 3],
  [2, 4],
  [2, 5],
  [3, 5],
  [4, 5],
  [5, 5],
];

const pits = [
  [3, 3],
  [3, 4],
  [7, 7]
];

walls.forEach(([i, j]) => {
  map[i][j] = WALL;
});

pits.forEach(([i, j]) => {
  map[i][j] = PIT;
});

export default {
  value: map,
  start: [7, 0]
};
