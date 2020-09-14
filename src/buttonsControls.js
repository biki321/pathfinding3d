import { cubeSelectState } from "./cubeSelectState";
import { clearMemory } from "./helperFunc";
import {
  setMeshExceptStartStopBlockNodeToDefaut,
  copyStartStopBlockNodes,
} from "./helperFunc";

function setButtonsevents(objects) {
  const setStartNode = document.querySelector(".setStartNode");
  const setStopNode = document.querySelector(".setStopNode");
  const setBlockers = document.querySelector(".setBlockers");
  const startButton = document.querySelector(".startButton");
  const startNew = document.querySelector(".startNew");
  const canvas = document.getElementById("canv");

  const algorithms = document.querySelector("#algorithms");

  setStartNode.addEventListener("click", () => {
    cubeSelectState.selectState = "setStartNode";
  });

  setStopNode.addEventListener("click", () => {
    cubeSelectState.selectState = "setStopNode";
  });

  setBlockers.addEventListener("click", () => {
    cubeSelectState.selectState = "setBlockers";
  });

  startButton.addEventListener("click", function () {
    console.log("strt");
    const algorithmToexecute = algorithms.value;
    console.log(`in setButton ${algorithmToexecute}`);
    // let e = new CustomEvent("runAlgorithm", { algorithm: algorithmToexecute });
    let e = new Event("runAlgorithm");
    //runAlgorithm function(runAlgorithm.js) is using this event
    canvas.dispatchEvent(
      // new CustomEvent("runAlgorithm", { algorithm: algorithmToexecute })
      e
    );
  });

  [setStartNode, setStopNode, setBlockers, startButton, canvas].forEach(
    function (ele) {
      ele.addEventListener("click", function () {
        if (cubeSelectState.isRoundComplete) {
          const copySet = copyStartStopBlockNodes();
          setMeshExceptStartStopBlockNodeToDefaut(copySet, objects);
          cubeSelectState.isRoundComplete = false;
        }
      });
    }
  );

  startNew.addEventListener(
    "click",
    function () {
      clearMemory(this);
    }.bind(objects)
  );
}

export { setButtonsevents };
