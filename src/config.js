const sizeOfPlane = 20;
const sizeOfCube = 1.8;
const noOfCubes = sizeOfPlane / Math.ceil(sizeOfCube);
const topLeftCoorOfPlane_y = noOfCubes - 1;
const topLeftCoorOfPlane_x = -(noOfCubes - 1);
const noOfCols = 10;
const noOfRows = 10;
const initialPosZOfCube = -0.7;
const initialColorOfCube = "#d2f6c5";
const colorForStartCube = "#189ad3";
const colorForStopCube = "#A4DE02";
const colorForBlockerCube = "#c87941";
// const colorForShortestPathCube = "yellow";
const colorForShortestPathCube = "#f0a500";
// const colorForCubeToChange = "cyan";
const colorForCubeToChange = "#28df99";
const heightestValOfZForCube = 0.9;
const board = new Array(noOfCubes);

for (let i = 0; i < noOfCubes; i++) {
  board[i] = new Array(noOfCubes);
}

for (let y = 0; y < noOfCubes; y++) {
  for (let x = 0; x < noOfCubes; x++) {
    board[y][x] = 0;
  }
}

console.log(board[0][0]);

export {
  sizeOfPlane,
  sizeOfCube,
  noOfCubes,
  topLeftCoorOfPlane_y,
  topLeftCoorOfPlane_x,
  board,
  noOfCols,
  noOfRows,
  initialPosZOfCube,
  initialColorOfCube,
  colorForStartCube,
  colorForStopCube,
  colorForBlockerCube,
  colorForShortestPathCube,
  colorForCubeToChange,
  heightestValOfZForCube,
};
