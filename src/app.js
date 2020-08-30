import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class Main {
  static canvas = document.querySelector("#canv");
  static renderer = new THREE.WebGLRenderer({
    canvas: Main.canvas,
  });

  static scene = new THREE.Scene();

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

  static addObjects() {
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
    // const box = new THREE.Mesh(geometry, material);
    // Main.objects.push(box);
    // Main.scene.add(box);

    const planeSize = 20;

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      "https://threejsfundamentals.org/threejs/resources/images/checker.png"
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const planeMesh = new THREE.Mesh(planeGeo, planeMat);
    // planeMesh.rotation.x = Math.PI * -.3;
    // planeMesh.rotation.y = Math.PI * .1;
    Main.scene.add(planeMesh);

    const startIn = 9;
    const cubeSize = 1.8;
    const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, 1);
    const cubeMat = new THREE.MeshPhongMaterial({ color: "red" });
    // const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    // mesh.position.set(-9, 9, 0);
    // planeMesh.add(mesh);

    // const cubeMat1 = new THREE.MeshPhongMaterial({ color: "red" });
    // const mesh1 = new THREE.Mesh(cubeGeo, cubeMat1);
    // mesh1.position.set(-7, 9, 0);
    // planeMesh.add(mesh1);

    for (let col = -startIn; col <= startIn; col = col + 2) {
      for (let row = startIn; row >= -startIn; row = row - 2) {
        const mesh1 = new THREE.Mesh(cubeGeo, cubeMat);
        mesh1.position.set(col, row, 0);
        planeMesh.add(mesh1);
      }
    }
  }

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
    time *= 0.001;

    if (Main.resizeRendererToDisplaySize()) {
      const canvas = Main.renderer.domElement;
      Main.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      Main.camera.updateProjectionMatrix();
    }

    // required if controls.enableDamping or controls.autoRotate are set to true
    Main.controls.update();

    Main.renderer.render(Main.scene, Main.camera);

    requestAnimationFrame(Main.render);
  }
}
Main.setCamera();
Main.setControls();
Main.setLight();
Main.addObjects();
requestAnimationFrame(Main.render);
// Main.renderer.render(Main.scene, Main.camera);
