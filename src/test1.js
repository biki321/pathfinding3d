import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r119/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/controls/OrbitControls.js";
import { GUI } from "https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js";

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 70;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 20);
  // camera.position.set(0, 5,0);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("black");

  let planeMesh;
  {
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
    planeMesh = new THREE.Mesh(planeGeo, planeMat);
    // planeMesh.rotation.x = Math.PI * -.3;
    // planeMesh.rotation.y = Math.PI * .1;
    scene.add(planeMesh);
  }
  {
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

  {
    const color = 0xffffff;
    const intensity = 1.3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-3.43, 3.0, -5.79);
    scene.add(light);
    scene.add(light.target);
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
