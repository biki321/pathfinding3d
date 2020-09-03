import { PriorityQueue } from "./priorityQueue";
import { convertCoorToNo, convertNosToCoor } from "./helperFunc";
import { noOfCols, noOfRows } from "./config";

const printPath = (previous, start, stop) => {
  let currentNode = stop;
  console.log(currentNode);
  while (currentNode !== start) {
    currentNode = previous.get(currentNode);
    console.log(currentNode);
  }
};

// eslint-disable-next-line
const dijkstra = (startNode, stopNode) => {
  const start = convertCoorToNo(startNode);
  const stop = convertCoorToNo(stopNode);

  const dr = [0, -1, 0, 1];
  const dc = [-1, 0, 1, 0];

  const distances = new Map();
  const previous = new Map();
  const visited = new Set();
  const remaining = new PriorityQueue();
  for (let node of [...Array(100).keys()]) {
    distances.set(node, Number.MAX_VALUE);
  }
  distances.set(start, 0);
  remaining.insert(start, 0);

  while (!remaining.isEmpty()) {
    const n = remaining.remove();
    console.log(`n: ${n}`);
    let nCoor = convertNosToCoor(n.value);
    console.log(`nCoor: ${nCoor}`);

    visited.add(n.value);

    if (n.value == stop) {
      console.log(` shortest dist: ${distances.get(stop)} `);
      printPath(previous, start, stop);
      return;
    }

    for (let i = 0; i < 4; ++i) {
      let index_r = nCoor[0] + dr[i];
      let index_c = nCoor[1] + dc[i];
      let neighbour = [index_r, index_c];

      if (
        index_r < 0 ||
        index_r >= noOfRows ||
        index_c < 0 ||
        index_c >= noOfCols
      ) {
        console.log(`neighbour: ${neighbour}`);
        continue;
      }
      let neighbourNo = convertCoorToNo(neighbour);

      if (!visited.has(neighbourNo)) {
        const newPathLength = distances.get(n.value) + 1;

        const oldPathLength = distances.get(neighbourNo);
        if (newPathLength < oldPathLength) {
          distances.set(neighbourNo, newPathLength);
          previous.set(neighbourNo, n.value);
          remaining.insert(neighbourNo, newPathLength);
        }
      }
    }
  }

  return { distance: -1, path: previous };
};
