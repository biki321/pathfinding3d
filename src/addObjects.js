import * as THREE from "three";
import {
  sizeOfPlane,
  sizeOfCube,
  topLeftCoorOfPlane_y,
  topLeftCoorOfPlane_x,
} from "./config";

export default (scene, objects) => {
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
  // const box = new THREE.Mesh(geometry, material);
  // objects.push(box);
  // scene.add(box);
  console.log(scene);
  console.log(objects);

  const planeSize = sizeOfPlane;

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
  scene.add(planeMesh);

  const topLeftCoorInPlane_y = topLeftCoorOfPlane_y;
  const topLeftCoorInPlane_x = topLeftCoorOfPlane_x;
  const cubeSize = sizeOfCube;
  const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, 1);
  const cubeMat = new THREE.MeshPhongMaterial({ color: "red" });
  // const mesh = new THREE.Mesh(cubeGeo, cubeMat);
  // mesh.position.set(-9, 9, 0);
  // planeMesh.add(mesh);

  // const cubeMat1 = new THREE.MeshPhongMaterial({ color: "red" });
  // const mesh1 = new THREE.Mesh(cubeGeo, cubeMat1);
  // mesh1.position.set(-7, 9, 0);
  // planeMesh.add(mesh1);

  for (
    let row = topLeftCoorInPlane_y;
    row >= -topLeftCoorInPlane_y;
    row = row - 2
  ) {
    let temp = [];
    for (
      let col = topLeftCoorInPlane_x;
      col <= -topLeftCoorInPlane_x;
      col = col + 2
    ) {
      const mesh = new THREE.Mesh(cubeGeo, cubeMat);
      mesh.position.set(col, row, -0.45);
      planeMesh.add(mesh);
      //temp.push(mesh);
      temp.push({ mesh: mesh });
    }
    objects.push(temp);
  }
};
