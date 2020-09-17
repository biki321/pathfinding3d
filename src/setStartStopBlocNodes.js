import { cubeSelectState } from "./cubeSelectState";
import { PickHelper } from "./pickHelper";

function getCanvasRelativePosition(event) {
  let canvas = document.querySelector("#canv");
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) * canvas.width) / rect.width,
    y: ((event.clientY - rect.top) * canvas.height) / rect.height,
  };
}

function setPickPosition(event, cubeSelectStateJson, data) {
  let canvas = document.querySelector("#canv");
  let cubeSelectState = JSON.parse(cubeSelectStateJson);

  const pos = getCanvasRelativePosition(event);
  let pickPosition = { x: 0, y: 0 };
  pickPosition.x = (pos.x / canvas.width) * 2 - 1;
  pickPosition.y = (pos.y / canvas.height) * -2 + 1; // note we flip Y

  data.pickHelper.pickAndSet(
    pickPosition,
    cubeSelectState,
    data.children,
    data.camera
  );
}

//meshCubes is the objects in the main object(in app.js)
function setStartStopBlocNodes(meshCubes, camera, objects) {
  const pickHelper = new PickHelper();
  let dataNeeded = {
    pickHelper: pickHelper,
    children: meshCubes,
    camera: camera,
    objects: objects,
  };

  let canvas = document.querySelector("#canv");

  if (typeof cubeSelectState.selectState === "undefined") {
    canvas.addEventListener(
      "click",
      function (event) {
        // if (cubeSelectState.isRoundComplete) {
        //   const copySet = copyStartStopBlockNodes();
        //   setMeshExceptStartStopBlockNodeToDefaut(copySet, this.objects);
        //   cubeSelectState.isRoundComplete = false;
        // }
        setPickPosition(event, JSON.stringify(cubeSelectState), this);
      }.bind(dataNeeded)
    );
  }
}

export { setStartStopBlocNodes };
