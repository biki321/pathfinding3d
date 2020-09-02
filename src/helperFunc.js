import {
  sizeOfCube,
  topLeftCoorOfPlane_x,
  topLeftCoorOfPlane_y,
  noOfCols,
} from "./config";

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

/* In a grid each element have a coordinate and also
each coordinate or each element can be represented by a number  */
const convertCoorToNo = (coor) => coor[0] * noOfCols + coor[1];
const convertNosToCoor = (A) => [Math.floor(A / noOfCols), A % noOfCols];

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export {
  convertRegularCoorToPlaneCoor,
  convertPlaneCoorToRegularCoor,
  convertCoorToNo,
  convertNosToCoor,
  sleep,
};
