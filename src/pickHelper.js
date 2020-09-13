import * as THREE from "three";
import { setStartStopBlockerAndAnimate } from "./helperFunc";

class PickHelper {
  constructor() {
    this.raycaster = new THREE.Raycaster();
    this.pickedObject = null;
  }
  pickAndSet(normalizedPosition, cubeSelectState, children, camera) {
    // restore the color if there is a picked object
    if (this.pickedObject) {
      this.pickedObject = undefined;
    }

    // cast a ray through the frustum
    this.raycaster.setFromCamera(normalizedPosition, camera);
    // get the list of objects the ray intersected
    const intersectedObjects = this.raycaster.intersectObjects(children);

    if (intersectedObjects.length) {
      // pick the first object. It's the closest one
      this.pickedObject = intersectedObjects[0].object;
      // console.log(this.pickedObject.info);
      setStartStopBlockerAndAnimate(this.pickedObject, cubeSelectState);
    }
  }
}

export { PickHelper };
