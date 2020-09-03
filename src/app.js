import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import addObjects from "./addObjects";
import TWEEN from "@tweenjs/tween.js";
import { bfs } from "./bfs";
import { dijkstra } from "./dijkstra";
import { convertCoorToNo } from "./helperFunc";

class Main {
  static canvas = document.querySelector("#canv");
  static renderer = new THREE.WebGLRenderer({
    canvas: Main.canvas,
  });

  static scene = new THREE.Scene();

  //put meshs which need animation
  static objects = [];

  //coordinates of nodes to use as blocker
  static blockersCoor = new Set();
  static blockersNo = new Set();

  static setBlockers = (coor) => {
    if (Array.isArray(coor)) {
      coor.forEach((ele) => {
        Main.blockersCoor.add(ele);
        Main.blockersNo.add(convertCoorToNo(ele));
      });
    } else {
      Main.blockersCoor.push(coor);
      Main.blockersNo.push(convertCoorToNo(coor));
    }
  };

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

  static render(time) {
    requestAnimationFrame(Main.render);
    //time *= 0.001;

    if (Main.resizeRendererToDisplaySize()) {
      const canvas = Main.renderer.domElement;
      Main.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      Main.camera.updateProjectionMatrix();
    }
    // required if controls.enableDamping or controls.autoRotate are set to true
    Main.controls.update();

    // requestAnimationFrame(render);
    TWEEN.update(time);
    Main.renderer.render(Main.scene, Main.camera);
  }

  //breath first search
  static bfs = bfs;

  //dijkstra algorithm
  static dijkstra = dijkstra;
}

Main.setCamera();
Main.setControls();
Main.setLight();
Main.addObjects(Main.scene, Main.objects);
Main.render();
Main.setBlockers([
  [2, 3],
  [2, 4],
  [3, 2],
]);
// Main.bfs(Main.objects, [0, 0], [7, 7], Main.blockersNo, Main.blockersCoor);
Main.dijkstra(Main.objects, [0, 0], [7, 7], Main.blockersNo, Main.blockersCoor);
