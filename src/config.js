const sizeOfPlane = 20;
const sizeOfCube = 1.8;
const noOfCubes = sizeOfPlane / Math.ceil(sizeOfCube);
const topLeftCoorOfPlane_y = noOfCubes - 1;
const topLeftCoorOfPlane_x = -(noOfCubes - 1);
const noOfCols = 10;
const noOfRows = 10;
const initialPosZOfCube = -0.85;
const initialColorOfCube = "red";
const colorForStartCube = "blue";
const colorForStopCube = "green";
const colorForBlockerCube = "brown";
const colorForShortestPathCube = "yellow";
const colorForCubeToChange = "cyan";
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
