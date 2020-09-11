import * as THREE from "three";
import {
  sizeOfPlane,
  sizeOfCube,
  topLeftCoorOfPlane_y,
  topLeftCoorOfPlane_x,
  initialPosZOfCube,
} from "./config";

export default function () {
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
  this.scene.add(planeMesh);

  const topLeftCoorInPlane_y = topLeftCoorOfPlane_y;
  const topLeftCoorInPlane_x = topLeftCoorOfPlane_x;
  const cubeSize = sizeOfCube;
  const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);

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
      const cubeMat = new THREE.MeshPhongMaterial({ color: "red" });
      const mesh = new THREE.Mesh(cubeGeo, cubeMat);
      mesh.position.set(col, row, initialPosZOfCube);
      planeMesh.add(mesh);
      temp.push({ mesh: mesh });
    }
    this.objects.push(temp);
  }
}
