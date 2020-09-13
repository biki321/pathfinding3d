import {
  sizeOfCube,
  topLeftCoorOfPlane_x,
  topLeftCoorOfPlane_y,
  noOfCols,
  colorForStartCube,
  colorForStopCube,
  colorForBlockerCube,
} from "./config";
import TWEEN from "@tweenjs/tween.js";
import {
  cubeSelectState as cubeSelectStateOrigin,
  disposeCubeSelectState,
} from "./cubeSelectState";
import { addTweenToACube } from "./animationHelper";

function convertRegularCoorToPlaneCoor(regularCoor) {
  let regularCoor_row = regularCoor[0];
  let regularCoor_col = regularCoor[1];

  let planeCoor_col =
    regularCoor_col * Math.ceil(sizeOfCube) - Math.abs(topLeftCoorOfPlane_x);

  let planeCoor_row =
    Math.abs(topLeftCoorOfPlane_y) - Math.ceil(sizeOfCube) * regularCoor_row;

  return [planeCoor_row, planeCoor_col];
}

function convertPlaneCoorToRegularCoor(planeCoor) {
  let planeCoor_row = planeCoor[0];
  let planeCoor_col = planeCoor[1];

  let regularCoor_col =
    (planeCoor_col + Math.abs(topLeftCoorOfPlane_x)) / Math.ceil(sizeOfCube);

  let regularCoor_row =
    (Math.abs(topLeftCoorOfPlane_y) - planeCoor_row) / Math.ceil(sizeOfCube);

  return [regularCoor_row, regularCoor_col];
}

/* In a grid each element have a coordinate and also
each coordinate or each element can be represented by a number  */
const convertCoorToNo = (coor) => coor[0] * noOfCols + coor[1];
const convertNosToCoor = (A) => [Math.floor(A / noOfCols), A % noOfCols];

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

function printPath(previous, start, stop) {
  let currentNode = stop;
  console.log(currentNode);
  while (currentNode !== start) {
    currentNode = previous.get(currentNode);
    console.log(currentNode);
  }
}

//only for start stop and blockers
function setStartStopBlockerAndAnimate(pickedObject, cubeSelectState) {
  if (
    cubeSelectState.selectState !== undefined &&
    cubeSelectState.selectState !== "setBlockers"
  ) {
    let regularCoor = convertPlaneCoorToRegularCoor([
      pickedObject.info.row,
      pickedObject.info.col,
    ]);
    //update the cubeSelectStateOrigin so that it can be accessed
    //by others too
    if (
      cubeSelectState.selectState === "setStartNode" &&
      typeof cubeSelectStateOrigin.startNode === "undefined"
    ) {
      cubeSelectStateOrigin.startNode = regularCoor;
      pickedObject.material.color.setColorName(colorForStartCube);
      addTweenToACube(pickedObject);
    }

    if (
      cubeSelectState.selectState === "setStopNode" &&
      typeof cubeSelectStateOrigin.stopNode === "undefined"
    ) {
      cubeSelectStateOrigin.stopNode = regularCoor;
      pickedObject.material.color.setColorName(colorForStopCube);
      addTweenToACube(pickedObject);
    }
  } else if (cubeSelectState.selectState === "setBlockers") {
    let regularCoor = convertPlaneCoorToRegularCoor([
      pickedObject.info.row,
      pickedObject.info.col,
    ]);
    if (typeof cubeSelectStateOrigin.blockers === "undefined") {
      cubeSelectStateOrigin.blockers = new Set();
      cubeSelectStateOrigin.blockers.add(convertCoorToNo(regularCoor));
      pickedObject.material.color.setColorName(colorForBlockerCube);
      addTweenToACube(pickedObject);
    } else {
      cubeSelectStateOrigin.blockers.add(convertCoorToNo(regularCoor));
      pickedObject.material.color.setColorName(colorForBlockerCube);
      addTweenToACube(pickedObject);
    }
  }
}

function clearMemory() {
  TWEEN.removeAll();
  this.setMeshesToDefaut();
  disposeCubeSelectState();
}

export {
  convertRegularCoorToPlaneCoor,
  convertPlaneCoorToRegularCoor,
  convertCoorToNo,
  convertNosToCoor,
  sleep,
  printPath,
  setStartStopBlockerAndAnimate,
  clearMemory,
};
