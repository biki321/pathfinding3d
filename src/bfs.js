import {
  noOfCubes,
  noOfCols,
  noOfRows,
  // initialPosZOfCube,
  heightestValOfZForCube,
} from "./config";
import { sleep, convertCoorToNo, convertNosToCoor } from "./helperFunc";
import {
  animateBLockers,
  initialAnimationForStartAndEndNode,
  addTweenToCube,
  animateShortestPath,
} from "./animationHelper";
import TWEEN from "@tweenjs/tween.js";

const bfs = async (
  objects,
  startNode = [0, 0],
  stopNode = [noOfCubes - 1, noOfCubes - 1],
  blockersNo,
  blockersCoor
) => {
  //delay for visual experience
  await sleep(1300);

  //it will store tween object for all the cubes in the board
  const tweens = [];

  for (let y = 0; y < noOfCubes; y++) {
    let temp = [];
    for (let x = 0; x < noOfCubes; x++) {
      temp[x] = -1;
    }
    tweens.push(temp);
  }

  await initialAnimationForStartAndEndNode(objects, startNode, stopNode);
  await animateBLockers(objects, blockersCoor);

  //sleep untill initial animations of start
  //and end node are completed
  await sleep(1300);

  //starting of the BFS algorithm
  const start = convertCoorToNo(startNode);
  const stop = convertCoorToNo(stopNode);

  const previous = new Map();
  const visited = new Set();
  const queue = [];
  const dr = [0, -1, 0, 1];
  const dc = [-1, 0, 1, 0];

  queue.push({ node: start, dist: 0 });
  visited.add(start);

  while (queue.length > 0) {
    let { node, dist } = queue.shift();

    if (node == stop) {
      console.log(`shortestDistande: : ${dist}`);
      //animation for the stop node when it is found
      // eslint-disable-next-line
      const stopNodeFound = new TWEEN.Tween({ z: heightestValOfZForCube })
        .to({ z: 3 * heightestValOfZForCube }, 500)
        .repeat(1)
        .yoyo(true)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate((tweenObj) => {
          objects[stopNode[0]][stopNode[1]].mesh.position.z = tweenObj.z;
        })
        .start();

      await sleep(1200);
      // return {previous:previous, shortestDistance: dist};
      //animate the shorest path from stoping node to starting node
      await animateShortestPath(previous, objects, start, stop, tweens);
      TWEEN.removeAll();
      return;
    }

    let nodeCoor = convertNosToCoor(node);
    for (let i = 0; i < 4; ++i) {
      let index_r = nodeCoor[0] + dr[i];
      let index_c = nodeCoor[1] + dc[i];
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

        //do not create tween for stopping node here
        //as it will be animated differently
        // if (JSON.stringify(neighbour) !== JSON.stringify(stopNode)) {
        if (neighbourNo !== stop) {
          await addTweenToCube(tweens, objects, index_r, index_c);
        }

        previous.set(neighbourNo, node);
        queue.push({ node: neighbourNo, dist: dist + 1 });
        visited.add(neighbourNo);
      }
    }
  }
  console.log("Not found");
  return { shortestDistance: -1, previous };
};

export { bfs };
