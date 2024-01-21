import { sampleSize } from 'lodash';

const _colorPoints = {
  p: 2,
  b: 3,
  y: 4,
  r: 5,
  g: 6
};

const _goalSquares = [20,21,30,31,40,41,50,51,28,29,38,39,48,49,58,59];

export function colorPoints(color) {
  return _colorPoints[color];
}

export function randomColor() {
  return Object.keys(_colorPoints)[Math.floor(Math.random() * 5)];
}

export function isGoalSquare(id) {
  return _goalSquares.includes(id);
}

function neighborsOf(id) {
  const row = Math.floor(id/10);
  const col = id % 10;
  const neighbors = [];
  if (row > 0)
    neighbors.push((row-1)*10 + col);
  if (row < 7)
    neighbors.push((row+1)*10 + col);
  if (col > 0)
    neighbors.push(row*10 + col - 1);
  if (col < 9)
    neighbors.push(row*10 + col + 1);
  return neighbors;
}

/**
 * Returns the collectable set of ids starting from `id`.
 */
export function collectable(squares, id) {
  if (!isGoalSquare(id))
    return [];

  const ids = [];

  function dfs(nextId) {
    ids.push(nextId);
    for (let v of neighborsOf(nextId)) {
      if (!ids.includes(v) && squares[v] === squares[id]) {
        dfs(v);
      }
    }
  }

  dfs(id);

  if (ids.length < 5)
    return [];

  return ids;
}

export function addColors(squares, numAdd) {
  const graySquares = [];
  for (let i = 0; i < 80; i++) {
    if (squares[i] === '-')
      graySquares.push(i);
  }

  const makeColor = sampleSize(graySquares, numAdd);
  for (let square of makeColor) {
    squares[square] = randomColor();
  }

  if (makeColor.length < numAdd)
    return false;

  return true;
}