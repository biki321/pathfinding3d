import {
  sizeOfCube,
  topLeftCoorOfPlane_x,
  topLeftCoorOfPlane_y,
  noOfCols,
  colorForStartCube,
  colorForStopCube,
  colorForBlockerCube,
  initialColorOfCube,
} from "./config";
import TWEEN from "@tweenjs/tween.js";
import {
  cubeSelectState as cubeSelectStateOrigin,
  disposeCubeSelectState,
} from "./cubeSelectState";
import { addTweenToACubeForUpOrDown } from "./animationHelper";

function convertRegularCoorToPlaneCoor(regularCoor) {
  if (typeof regularCoor === "undefined") return undefined;
  let regularCoor_row = regularCoor[0];
  let regularCoor_col = regularCoor[1];

  let planeCoor_col =
    regularCoor_col * Math.ceil(sizeOfCube) - Math.abs(topLeftCoorOfPlane_x);

  let planeCoor_row =
    Math.abs(topLeftCoorOfPlane_y) - Math.ceil(sizeOfCube) * regularCoor_row;

  return [planeCoor_row, planeCoor_col];
}

function convertPlaneCoorToRegularCoor(planeCoor) {
  if (typeof planeCoor === "undefined") return undefined;
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
function convertCoorToNo(coordinate) {
  if (typeof coordinate === "undefined") return undefined;
  return coordinate[0] * noOfCols + coordinate[1];
}
function convertNosToCoor(A) {
  if (typeof A === "undefined") return undefined;
  return [Math.floor(A / noOfCols), A % noOfCols];
}

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
  let regularCoor = convertPlaneCoorToRegularCoor([
    pickedObject.info.row,
    pickedObject.info.col,
  ]);
  let regularCoorNo = convertCoorToNo(regularCoor);
  if (!regularCoor) return;
  if (
    cubeSelectState.selectState !== undefined &&
    cubeSelectState.selectState !== "setBlockers"
  ) {
    if (cubeSelectState.selectState === "setStartNode") {
      if (
        regularCoorNo === convertCoorToNo(cubeSelectStateOrigin.stopNode) ||
        (cubeSelectStateOrigin.blockers &&
          cubeSelectStateOrigin.blockers.has(regularCoorNo))
      )
        return;
      let preObj = cubeSelectStateOrigin.startNodeObj;
      if (
        typeof preObj !== "undefined" &&
        cubeSelectStateOrigin.startNode[0] == regularCoor[0] &&
        cubeSelectStateOrigin.startNode[1] == regularCoor[1]
      ) {
        preObj.material.color.setColorName(initialColorOfCube);
        addTweenToACubeForUpOrDown(preObj, "down");
        cubeSelectStateOrigin.startNode = undefined;
        cubeSelectStateOrigin.startNodeObj = undefined;
        return;
      } else if (typeof preObj !== "undefined") {
        preObj.material.color.setColorName(initialColorOfCube);
        addTweenToACubeForUpOrDown(preObj, "down");
      }
      cubeSelectStateOrigin.startNode = regularCoor;
      cubeSelectStateOrigin.startNodeObj = pickedObject;
      pickedObject.material.color.setColorName(colorForStartCube);
      addTweenToACubeForUpOrDown(pickedObject);
    }

    if (cubeSelectState.selectState === "setStopNode") {
      if (
        regularCoorNo === convertCoorToNo(cubeSelectStateOrigin.startNode) ||
        (cubeSelectStateOrigin.blockers &&
          cubeSelectStateOrigin.blockers.has(regularCoorNo))
      )
        return;
      let preObj = cubeSelectStateOrigin.stopNodeObj;
      if (
        typeof preObj !== "undefined" &&
        cubeSelectStateOrigin.stopNode[0] == regularCoor[0] &&
        cubeSelectStateOrigin.stopNode[1] == regularCoor[1]
      ) {
        preObj.material.color.setColorName(initialColorOfCube);
        addTweenToACubeForUpOrDown(preObj, "down");
        cubeSelectStateOrigin.stopNode = undefined;
        cubeSelectStateOrigin.stopNodeObj = undefined;
        return;
      } else if (typeof preObj !== "undefined") {
        preObj.material.color.setColorName(initialColorOfCube);
        addTweenToACubeForUpOrDown(preObj, "down");
      }
      cubeSelectStateOrigin.stopNode = regularCoor;
      cubeSelectStateOrigin.stopNodeObj = pickedObject;
      pickedObject.material.color.setColorName(colorForStopCube);
      addTweenToACubeForUpOrDown(pickedObject);
    }
  } else if (cubeSelectState.selectState === "setBlockers") {
    if (
      regularCoorNo === convertCoorToNo(cubeSelectStateOrigin.startNode) ||
      regularCoorNo === convertCoorToNo(cubeSelectStateOrigin.stopNode)
    )
      return;
    if (typeof cubeSelectStateOrigin.blockers === "undefined") {
      cubeSelectStateOrigin.blockers = new Set();
    }
    // let upOrDown = "up";
    // let color = colorForBlockerCube;
    //if the block coordinate already exists
    if (cubeSelectStateOrigin.blockers.has(regularCoorNo)) {
      // upOrDown = "down";
      // color = initialColorOfCube;
      cubeSelectStateOrigin.blockers.delete(regularCoorNo);
      pickedObject.material.color.setColorName(initialColorOfCube);
      addTweenToACubeForUpOrDown(pickedObject, "down");
      return;
    }
    cubeSelectStateOrigin.blockers.add(regularCoorNo);
    pickedObject.material.color.setColorName(colorForBlockerCube);
    addTweenToACubeForUpOrDown(pickedObject);
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
