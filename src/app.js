import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { addObjects } from "./addObjects";
import TWEEN from "@tweenjs/tween.js";
import { setButtonsevents } from "./buttonsControls";
import { setStartStopBlocNodes } from "./setStartStopBlocNodes";
import { runAlgorithm } from "./runAlgorithm";

var main = {
  canvas: document.querySelector("#canv"),
  scene: new THREE.Scene(),

  //put meshs which need animation
  objects: [],

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
  },

  setCamera() {
    let fov = 75;
    let aspect = 2; // the canvas default
    let near = 0.1;
    let far = 100;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

    this.camera.position.set(0, 10, 25);
    // Main.camera.position.z : 2,
    //Main.camera.up.set(0, 0, 1),
    // Main.camera.lookAt(0, 0, 0),
  },

  setBoardControls() {
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
    TWEEN.update(time);
    this.renderer.render(this.scene, this.camera);
  },
};

function setUpBoard() {
  main.setCamera();
  main.setBoardControls();
  main.setLight();
  main.addObjects();
  main.setRenderer();
  main.render();
}

function driver() {
  setUpBoard();

  //in the ui the user have to press buttons
  //like setStartNode, setStopNode, setblockers
  setButtonsevents(main.objects);

  setStartStopBlocNodes(
    main.scene.getObjectByName("planeMesh").children,
    main.camera,
    main.objects
  );

  runAlgorithm.call(main);
}

driver();
