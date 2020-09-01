let noOfCols = 10;
let noOfRows = 5;
//const convertCoorToNo = ([r, c]) => r * noOfCols + c;
const convertCoorToNo = (coor) => coor[0] * noOfCols + coor[1];

const convertNosToCoor = (A) => [Math.floor(A / noOfCols), A % noOfCols];

const shortestPathBfs = (startNode, stopNode) => {
  let start = convertCoorToNo(startNode);
  let stop = convertCoorToNo(stopNode);

  const previous = new Map();
  const visited = new Set();
  const queue = [];
  const dr = [0, -1, 0, 1];
  const dc = [-1, 0, 1, 0];

  queue.push({ node: start, dist: 0 });
  visited.add(start);

  while (queue.length > 0) {
    const { node, dist } = queue.shift();

    if (node === stop) {
      return { shortestDistande: dist, previous };
    }

    let nodeCoor = convertNosToCoor(node);
    for (let i = 0; i < 4; ++i) {
      let index_r = nodeCoor[0] + dr[i];
      let index_c = nodeCoor[1] + dc[i];
      let neighbour = [index_r, index_c];

      console.log(neighbour);
      if (
        index_r < 0 ||
        index_r > noOfRows ||
        index_c < 0 ||
        index_c > noOfCols
      )
        continue;

      let neighbour1 = convertCoorToNo(neighbour);
      console.log(`neightbour: ${neighbour1}`);
      console.log("===");

      if (!visited.has(neighbour1)) {
        previous.set(neighbour1, node);
        queue.push({ node: neighbour1, dist: dist + 1 });
        visited.add(neighbour1);
      }
    }
    console.log("++++++");
  }
  return { shortestDistance: -1, previous };
};
console.log(shortestPathBfs([0, 0], [5, 5]));
