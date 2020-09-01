import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import addObjects from "./addObjects";
import TWEEN from "@tweenjs/tween.js";
import { noOfCubes, noOfRows, noOfCols } from "./config";

class Main {
  static canvas = document.querySelector("#canv");
  static renderer = new THREE.WebGLRenderer({
    canvas: Main.canvas,
  });

  static scene = new THREE.Scene();

  //put meshs which need animation
  static objects = [];

  static setCamera() {
    Main.fov = 75;
    Main.aspect = 2; // the canvas default
    Main.near = 0.1;
    Main.far = 100;
    Main.camera = new THREE.PerspectiveCamera(
      Main.fov,
      Main.aspect,
      Main.near,
      Main.far
    );

    Main.camera.position.set(0, 0, 20);
    // Main.camera.position.z = 2;
    //Main.camera.up.set(0, 0, 1);
    // Main.camera.lookAt(0, 0, 0);
  }

  static setControls() {
    Main.controls = new OrbitControls(Main.camera, Main.canvas);
    Main.controls.target.set(0, 0, 0);
    // Main.controls.enableDamping = true;
    // Main.controls.dampingFactor = 0.05;
    Main.controls.update();
  }

  static setLight() {
    const color = 0xffffff;
    const intensity = 1.3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-3.43, 3.0, -5.79);
    Main.scene.add(light);
    Main.scene.add(light.target);
  }

  static addObjects = addObjects;

  static resizeRendererToDisplaySize() {
    const canvas = Main.renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      Main.renderer.setSize(width, height, false);
    }
    return needResize;
  }

  static tweens = [];
  static positionsZ = [];

  static bfs() {
    const convertCoorToNo = (coor) => coor[0] * noOfCols + coor[1];
    const convertNosToCoor = (A) => [Math.floor(A / noOfCols), A % noOfCols];

    function render(time) {
      //time *= 0.001;

      if (Main.resizeRendererToDisplaySize()) {
        const canvas = Main.renderer.domElement;
        Main.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        Main.camera.updateProjectionMatrix();
      }
      // required if controls.enableDamping or controls.autoRotate are set to true
      Main.controls.update();

      requestAnimationFrame(render);
      TWEEN.update(time);
      Main.renderer.render(Main.scene, Main.camera);
    }
    requestAnimationFrame(render);

    // Main.tweens = [];
    // Main.positionsZ = [];

    for (let y = 0; y < noOfCubes; y++) {
      let temp = [];
      for (let x = 0; x < noOfCubes; x++) {
        temp[x] = -1;
      }
      Main.tweens.push(temp);
      Main.positionsZ.push(temp);
    }

    for (let y = 0; y < noOfCubes; y++) {
      for (let x = 0; x < noOfCubes; x++) {
        Main.positionsZ[y][x] = { z: -0.45 };
        Main.tweens[y][x] = new TWEEN.Tween(Main.positionsZ[y][x])
          .to({ z: 0.5 }, 3000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate((obj) => {
            Main.objects[y][x].mesh.position.z = obj.z;
          })
          .delay(2000)
          .start();

        //yoyo gives a oscillatory motion
        Main.tweens[y][x].repeat(1).yoyo({ yoyo: true });
      }
    }

    // const startNode = [0, 0],
    //   stopNode = [8, 8];
    // const start = convertCoorToNo(startNode);
    // const stop = convertCoorToNo(stopNode);

    // const previous = new Map();
    // const visited = new Set();
    // const queue = [];
    // const dr = [0, -1, 0, 1];
    // const dc = [-1, 0, 1, 0];

    // queue.push({ node: start, dist: 0 });
    // visited.add(start);

    // while (queue.length > 0) {
    //   let { node, dist } = queue.shift();

    //   if (node == stop) {
    //     console.log(` shortestDistande: : ${dist}`);
    //     return { shortestDistande: dist };
    //   }

    //   let nodeCoor = convertNosToCoor(node);
    //   for (let i = 0; i < 4; ++i) {
    //     let index_r = nodeCoor[0] + dr[i];
    //     let index_c = nodeCoor[1] + dc[i];
    //     let neighbour = [index_r, index_c];

    //     console.log(`index_r: ${index_r}, index_c: ${index_c}`);
    //     if (
    //       index_r < 0 ||
    //       index_r >= noOfRows ||
    //       index_c < 0 ||
    //       index_c >= noOfCols
    //     ) {
    //       continue;
    //     }

    //     let neighbour1 = convertCoorToNo(neighbour);
    //     console.log(`neightbour: ${neighbour1}`);
    //     console.log("===");

    //     console.log(`visited.has(neighbour1): ${visited.has(neighbour1)}`);

    //     if (!visited.has(neighbour1)) {
    //       console.log(
    //         `positionsZ[index_r][index_c]: ${positionsZ[index_r][index_c]}`
    //       );
    //       positionsZ[index_r][index_c] = { z: -0.45 };
    //       console.log(
    //         `positionsZ[index_r][index_c]: ${positionsZ[index_r][index_c].z}`
    //       );

    //       tweens[index_r][index_c] = new TWEEN.Tween(
    //         positionsZ[index_r][index_c]
    //       )
    //         .to({ z: 0.5 }, 1500)
    //         .easing(TWEEN.Easing.Quadratic.Out)
    //         .onUpdate(() => {
    //           Main.objects[index_r][index_c].mesh.position.z =
    //             positionsZ[index_r][index_c].z;
    //         })
    //         .start();

    //       //yoyo gives a oscillatory motion
    //       tweens[index_r][index_c].repeat(1).yoyo({ yoyo: true });

    //       previous.set(neighbour1, node);
    //       queue.push({ node: neighbour1, dist: dist + 1 });
    //       visited.add(neighbour1);
    //     }
    //   }
    //   console.log("++++++");
    // }
    // //return { shortestDistance: -1, previous };
    // console.log("Not found");
  }
}

Main.setCamera();
Main.setControls();
Main.setLight();
Main.addObjects(Main.scene, Main.objects);
Main.bfs();
//requestAnimationFrame(Main.render);
// Main.renderer.render(Main.scene, Main.camera);
