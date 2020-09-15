import { cubeSelectState } from "./cubeSelectState";
import { clearMemory } from "./helperFunc";
import {
  setMeshExceptStartStopBlockNodeToDefaut,
  copyStartStopBlockNodes,
} from "./helperFunc";
var currentbtn;
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

  //set meshes to default except start, stop, blocker after clicking
  //on any of canvas, start, stop, blocker buttons
  //provided one round of algorithm is finished
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

  //make a button unfocused only after clicking in any other button
  //not in screen
  [setStartNode, setStopNode, setBlockers].forEach(function (ele) {
    console.log("hiii");
    ele.addEventListener("click", function () {
      console.log(`clicked on ${this}`);
      if (currentbtn) {
        console.log(currentbtn);
        currentbtn.classList.remove("highlight");
      }
      this.classList.add("highlight");
      currentbtn = this;
    });
  });

  startNew.addEventListener(
    "click",
    function () {
      clearMemory(this);
    }.bind(objects)
  );
}

export { setButtonsevents };
