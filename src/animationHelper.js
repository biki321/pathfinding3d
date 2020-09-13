import { initialPosZOfCube, heightestValOfZForCube } from "./config";
import {
  noOfCubes,
  colorForBlockerCube,
  colorForStartCube,
  colorForStopCube,
  colorForShortestPathCube,
  colorForCubeToChange,
} from "./config";
import TWEEN from "@tweenjs/tween.js";
import { convertNosToCoor, sleep } from "./helperFunc";

async function animateBLockers(objects, blockersCoor) {
  // eslint-disable-next-line
  const blockerTween = new TWEEN.Tween({ z: initialPosZOfCube })
    .to({ z: heightestValOfZForCube }, 500)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate((tweenObj) => {
      blockersCoor.forEach((coor) => {
        objects[coor[0]][coor[1]].mesh.position.z = tweenObj.z;
      });
    })
    .start();

  blockersCoor.forEach((coor) => {
    objects[coor[0]][coor[1]].mesh.material.color.setColorName(
      colorForBlockerCube
    );
  });
}

async function initialAnimationForStartAndEndNode(
  objects,
  startNode = [0, 0],
  stopNode = [noOfCubes - 1, noOfCubes - 1]
) {
  //setting the color of starting node blue
  //and ending node as green
  objects[startNode[0]][startNode[1]].mesh.material.color.setColorName(
    colorForStartCube
  );
  objects[stopNode[0]][stopNode[1]].mesh.material.color.setColorName(
    colorForStopCube
  );

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
}

async function addTweenToCubeDuringAlgoRunning(
  tweens,
  objects,
  index_r,
  index_c
) {
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
  objects[index_r][index_c].mesh.material.color.setColorName(
    colorForCubeToChange
  );
}

async function addTweenToACube(box) {
  //eslint-disable-next-line
  const tween = new TWEEN.Tween({ z: initialPosZOfCube })
    .to({ z: heightestValOfZForCube }, 800)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate((tweenObj) => {
      box.position.z = tweenObj.z;
    })
    .start();
}

async function animateShortestPath(previous, objects, start, stop, tweens) {
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
      ].mesh.material.color.setColorName(colorForShortestPathCube);

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

      await sleep(2000);

      break;
    }
    objects[currentNodeCoor[0]][
      currentNodeCoor[1]
    ].mesh.material.color.setColorName(colorForShortestPathCube);

    tweens[currentNodeCoor[0]][currentNodeCoor[1]].start();

    await sleep(200);
  }
}

export {
  animateBLockers,
  addTweenToACube,
  initialAnimationForStartAndEndNode,
  addTweenToCubeDuringAlgoRunning,
  animateShortestPath,
};
