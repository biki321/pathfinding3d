import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import addObjects from "./addObjects";
import TWEEN from "@tweenjs/tween.js";
import { bfs } from "./bfs";
import { dijkstra } from "./dijkstra";
import { aStar } from "./aStar";
import { convertCoorToNo } from "./helperFunc";

var main = {
  canvas: document.querySelector("#canv"),
  // renderer: new THREE.WebGLRenderer({
  //   canvas: Main.canvas,
  // }),

  scene: new THREE.Scene(),

  //put meshs which need animation
  objects: [],

  //coordinates of nodes to use as blocker
  blockersCoor: new Set(),
  blockersNo: new Set(),

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
  },

  setBlockers(coordinate) {
    if (Array.isArray(coordinate)) {
      coordinate.forEach((ele) => {
        this.blockersCoor.add(ele);
        this.blockersNo.add(convertCoorToNo(ele));
      });
    } else {
      this.blockersCoor.push(coordinate);
      this.blockersNo.push(convertCoorToNo(coordinate));
    }
  },

  setCamera() {
    let fov = 75;
    let aspect = 2; // the canvas default
    let near = 0.1;
    let far = 100;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    this.camera.position.set(0, 0, 20);
    // Main.camera.position.z : 2,
    //Main.camera.up.set(0, 0, 1),
    // Main.camera.lookAt(0, 0, 0),
  },

  setControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.target.set(0, 0, 0);
    // Main.controls.enableDamping : true,
    // Main.controls.dampingFactor : 0.05,
    this.controls.update();
  },

  setLight() {
    const color = 0xffffff;
    const intensity = 1.3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-3.43, 3.0, -5.79);
    this.scene.add(light);
    this.scene.add(light.target);
  },

  addObjects: addObjects,

  resizeRendererToDisplaySize() {
    const canvas = this.renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      this.renderer.setSize(width, height, false);
    }
    return needResize;
  },

  render(time) {
    requestAnimationFrame(this.render.bind(this));
    //time *: 0.001,

    if (this.resizeRendererToDisplaySize()) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }
    // required if controls.enableDamping or controls.autoRotate are set to true
    this.controls.update();

    // requestAnimationFrame(render),
    TWEEN.update(time);
    this.renderer.render(this.scene, this.camera);
  },

  //breath first search
  bfs: bfs,

  //dijkstra algorithm
  dijkstra: dijkstra,

  aStar: aStar,
};

main.setCamera();
main.setControls();
main.setLight();
main.addObjects();
main.setRenderer();
main.render();
main.setBlockers([
  [2, 3],
  [2, 4],
  [3, 2],
]);
main.bfs([0, 0], [7, 7]);
// main.dijkstra( [0, 0], [7, 7]);
// main.aStar( [0, 0], [7, 7]);
