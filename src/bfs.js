import {
  noOfCubes,
  noOfCols,
  noOfRows,
  initialPosZOfCube,
  heightestValOfZForCube,
} from "./config";
import { sleep, convertCoorToNo, convertNosToCoor } from "./helperFunc";
import TWEEN from "@tweenjs/tween.js";
import { Color } from "three";

const bfs = async (objects, startNode, stopNode) => {
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

      if (!visited.has(neighbourNo)) {
        //creation of tween for the node is made to wait a little
        //bit for better visual experience
        await sleep(100);

        //do not create tween for stopping node here
        //as it will be animated differently
        if (JSON.stringify(neighbour) !== JSON.stringify(stopNode)) {
          await addTweenToCube(tweens, objects, index_r, index_c);
        }

        previous.set(neighbourNo, node);
        queue.push({ node: neighbourNo, dist: dist + 1 });
        visited.add(neighbourNo);
      }
    }
  }
  //return { shortestDistance: -1, previous };
  console.log("Not found");
};

const addTweenToCube = async (tweens, objects, index_r, index_c) => {
  tweens[index_r][index_c] = new TWEEN.Tween({ z: initialPosZOfCube })
    .to({ z: heightestValOfZForCube }, 800)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate((tweenObj) => {
      objects[index_r][index_c].mesh.position.z = tweenObj.z;
    })
    .repeat(1)
    .yoyo({ yoyo: true })
    .start();

  //change the color of the neightbour mesh also
  objects[index_r][index_c].mesh.material.color.setColorName("cyan");
};

const initialAnimationForStartAndEndNode = async (
  objects,
  startNode,
  stopNode
) => {
  //setting the color of starting node blue
  //and ending node as green
  objects[startNode[0]][startNode[1]].mesh.material.color = new Color("blue");
  objects[stopNode[0]][stopNode[1]].mesh.material.color.setColorName("green");

  //this tween will do the first part of animaition for both start and
  //stop nodes(increase the height)
  const startStopNodeTween = new TWEEN.Tween({ z: initialPosZOfCube })
    .to({ z: heightestValOfZForCube }, 1000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate((tweenObj) => {
      objects[startNode[0]][startNode[1]].mesh.position.z = tweenObj.z;
      objects[stopNode[0]][stopNode[1]].mesh.position.z = tweenObj.z;
    })
    .yoyo({ yoyo: true });

  //this tween is for second animation for start node
  //i found only this as easy way with tween.js
  const startNodeTween2 = new TWEEN.Tween({ z: heightestValOfZForCube })
    .to({ z: 0.2 }, 300)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate((tweenObj) => {
      objects[startNode[0]][startNode[1]].mesh.position.z = tweenObj.z;
    })
    .delay(200)
    .repeat(1)
    .repeatDelay(0)
    .yoyo({ yoyo: true });

  startStopNodeTween.chain(startNodeTween2).start();
};

const animateShortestPath = async (previous, objects, start, stop, tweens) => {
  let currentNodeNo = stop;
  let currentNodeCoor;
  let startNodeCoor = convertNosToCoor(start);
  while (currentNodeNo !== start) {
    currentNodeNo = previous.get(currentNodeNo);
    currentNodeCoor = convertNosToCoor(currentNodeNo);

    //do a bit different aniamation for starting node
    if (JSON.stringify(currentNodeCoor) === JSON.stringify(startNodeCoor)) {
      objects[startNodeCoor[0]][
        startNodeCoor[1]
      ].mesh.material.color.setColorName("yellow");

      //eslint-disable-next-line
      const startNode = new TWEEN.Tween({ z: heightestValOfZForCube })
        .to({ z: 3 * heightestValOfZForCube }, 500)
        .repeat(1)
        .yoyo(true)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate((tweenObj) => {
          objects[startNodeCoor[0]][startNodeCoor[1]].mesh.position.z =
            tweenObj.z;
        })
        .start();

      await sleep(1000);

      break;
    }
    objects[currentNodeCoor[0]][
      currentNodeCoor[1]
    ].mesh.material.color.setColorName("yellow");

    tweens[currentNodeCoor[0]][currentNodeCoor[1]].start();

    await sleep(200);
  }
};

export { bfs };
