import {
  sizeOfCube,
  topLeftCoorOfPlane_x,
  topLeftCoorOfPlane_y,
} from "./config";

//startNode = [0,0], stopNode = [noOfCubes-1,noOfCubes-1]
const shortestPathBfs = (startNode, stopNode) => {
  const previous = new Map();
  const visited = new Set();
  const queue = [];
  const dr = [0, -1, 0, 1];
  const dc = [-1, 0, 1, 0];

  queue.push({ node: startNode, dist: 0 });
  visited.add(startNode);

  while (queue.length > 0) {
    const { node, dist } = queue.shift();
    if (node === stopNode) return { shortestDistande: dist, previous };

    // for (let neighbour of adjacencyList.get(node)) {
    //   if (!visited.has(neighbour)) {
    //     previous.set(neighbour, node);
    //     queue.push({ node: neighbour, dist: dist + 1 });
    //     visited.add(neighbour);
    //   }
    // }

    for (let i = 0; i < 4; i++) {
      let index_r = node[0] + dr[i];
      let index_c = node[1] + dc[i];
      let neighbour = [index_r, index_c];
      if (!visited.has(neighbour)) {
        previous.set(neighbour, node);
        queue.push({ node: neighbour, dist: dist + 1 });
        visited.add(neighbour);
      }
    }
  }
  return { shortestDistance: -1, previous };
};

const convertRegularCoorToPlaneCoor = (regularCoor) => {
  let regularCoor_row = regularCoor[0];
  let regularCoor_col = regularCoor[1];

  let planeCoor_col =
    regularCoor_col * Math.ceil(sizeOfCube) - Math.abs(topLeftCoorOfPlane_x);

  let planeCoor_row =
    Math.abs(topLeftCoorOfPlane_y) - Math.ceil(sizeOfCube) * regularCoor_row;

  return [planeCoor_row, planeCoor_col];
};

const convertPlaneCoorToRegularCoor = (planeCoor) => {
  let planeCoor_row = planeCoor[0];
  let planeCoor_col = planeCoor[1];

  let regularCoor_col =
    (planeCoor_col + Math.abs(topLeftCoorOfPlane_x)) / Math.ceil(sizeOfCube);

  let regularCoor_row =
    (Math.abs(topLeftCoorOfPlane_y) - planeCoor_row) / Math.ceil(sizeOfCube);

  return [regularCoor_row, regularCoor_col];
};

export {
  shortestPathBfs,
  convertRegularCoorToPlaneCoor,
  convertPlaneCoorToRegularCoor,
};
