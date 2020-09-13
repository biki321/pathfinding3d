import { cubeSelectState } from "./cubeSelectState";

function setButtonsevents() {
  const setStartNode = document.querySelector(".setStartNode");
  const setStopNode = document.querySelector(".setStopNode");
  const setBlockers = document.querySelector(".setBlockers");
  const startButton = document.querySelector(".startButton");
  const canvas = document.querySelector("#canv");
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
    canvas.dispatchEvent(
      // new CustomEvent("runAlgorithm", { algorithm: algorithmToexecute })
      e
    );
  });
}

export { setButtonsevents };
