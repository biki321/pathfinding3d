import { PriorityQueue } from "./priorityQueue";
import {
  noOfCols,
  noOfRows,
  noOfCubes,
  heightestValOfZForCube,
} from "../config";
import { sleep, convertCoorToNo, convertNosToCoor } from "../helperFunc";
import {
  // animateBLockers,
  // initialAnimationForStartAndEndNode,
  addTweenToCubeDuringAlgoRunning,
  animateShortestPath,
} from "../animationHelper";
import TWEEN from "@tweenjs/tween.js";

function heuristic(pos1, pos2) {
  // This is the Manhattan distance
  let d1 = Math.abs(pos1[0] - pos2[0]);
  let d2 = Math.abs(pos1[1] - pos2[1]);
  return d1 + d2;
}

// eslint-disable-next-line
async function aStar(
  startNode = [0, 0],
  stopNode = [noOfCubes - 1, noOfCubes - 1],
  blockersNo = new Set()
) {
  //delay for visual experience
  await sleep(1000);

  //it will store tween object for all the cubes in the board
  const tweens = [];

  for (let y = 0; y < noOfCubes; y++) {
    let temp = [];
    for (let x = 0; x < noOfCubes; x++) {
      temp[x] = -1;
    }
    tweens.push(temp);
  }

  // await initialAnimationForStartAndEndNode(this.objects, startNode, stopNode);
  // await animateBLockers(this.objects, this.blockersCoor);

  //sleep untill initial animations of start
  //and end node are completed
  // await sleep(1300);

  //starting of the algorithm
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
    let nCoor = convertNosToCoor(n.value);

    visited.add(n.value);

    if (n.value == stop) {
      console.log(` shortest dist: ${distances.get(stop)} `);
      //animation for the stop node when it is found
      // eslint-disable-next-line
      const stopNodeFound = new TWEEN.Tween({ z: heightestValOfZForCube })
        .to({ z: 3 * heightestValOfZForCube }, 500)
        .repeat(1)
        .yoyo(true)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate((tweenObj) => {
          this.objects[stopNode[0]][stopNode[1]].mesh.position.z = tweenObj.z;
        })
        .start();

      await sleep(1200);
      // return {previous:previous, shortestDistance: dist};
      //animate the shorest path from stoping node to starting node
      await animateShortestPath(previous, this.objects, start, stop, tweens);
      // TWEEN.removeAll();
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
        continue;
      }
      let neighbourNo = convertCoorToNo(neighbour);

      //check if the node is is blocker
      if (blockersNo.has(neighbourNo)) continue;

      if (!visited.has(neighbourNo)) {
        //creation of tween for the node is made to wait a little
        //bit for better visual experience
        await sleep(100);

        const newPathLength = distances.get(n.value) + 1;
        const newPathLengthWithHeuristic =
          newPathLength + heuristic(neighbour, stopNode);

        const oldPathLength = distances.get(neighbourNo);

        if (newPathLength < oldPathLength) {
          distances.set(neighbourNo, newPathLength);
          previous.set(neighbourNo, n.value);
          remaining.insert(neighbourNo, newPathLengthWithHeuristic);
          //do not create tween for stopping node here
          //as it will be animated differently
          // if (JSON.stringify(neighbour) !== JSON.stringify(stopNode)) {
          if (neighbourNo !== stop) {
            await addTweenToCubeDuringAlgoRunning(
              tweens,
              this.objects,
              index_r,
              index_c
            );
          }
        }
      }
    }
  }

  return { shortestDist: -1, path: previous };
}

export { aStar };
