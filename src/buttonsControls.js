import { cubeSelectState } from "./cubeSelectState";
import { clearMemory } from "./helperFunc";
import {
  setMeshExceptStartStopBlockNodeToDefaut,
  copyStartStopBlockNodes,
} from "./helperFunc";

var currentBlockSelectorBtn;
var currentTab = 0;

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
    const algorithmToexecute = algorithms.value;
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
    ele.addEventListener("click", function () {
      if (currentBlockSelectorBtn) {
        currentBlockSelectorBtn.classList.remove("highlight");
      }
      this.classList.add("highlight");
      currentBlockSelectorBtn = this;
    });
  });

  startNew.addEventListener(
    "click",
    function () {
      clearMemory(this);
    }.bind(objects)
  );

  controlModalGuide();
}

function controlModalGuide() {
  const modal = document.querySelector("#modal");
  const modalOverlay = document.querySelector("#modal-overlay");
  const closeButton = document.querySelector("#close-button");
  const openButton = document.querySelector("#open-button");

  window.addEventListener("load", () => {
    showTab(currentTab);
  });

  //close the entire modal
  closeButton.addEventListener("click", function () {
    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
  });

  //open the entire modal
  openButton.addEventListener("click", function () {
    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
    showTab(currentTab);
  });

  const preBtn = document.querySelector("#prevBtn");
  const nextBtn = document.querySelector("#nextBtn");

  preBtn.addEventListener("click", function () {
    nextPrev(-1);
  });

  nextBtn.addEventListener("click", function () {
    nextPrev(+1);
  });
}

function showTab(n) {
  // This function will display the specified tab of the form...
  const tabs = document.querySelectorAll(".tab");
  tabs[n].style.display = "block";

  const prevBtn = document.querySelector("#prevBtn");
  const nextBtn = document.querySelector("#nextBtn");

  //... and fix the Previous/Next buttons:
  if (n == 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "inline";
  }
  if (n == tabs.length - 1) {
    nextBtn.innerHTML = "Finish";
  } else {
    nextBtn.innerHTML = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  const tabs = document.querySelectorAll(".tab");

  // Hide the current tab:
  tabs[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;

  // if you have reached the end of the slides..
  if (currentTab >= tabs.length) {
    //close the entire modal
    const modal = document.querySelector("#modal");
    const modalOverlay = document.querySelector("#modal-overlay");
    currentTab = 0;
    modal.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
    return;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function fixStepIndicator(n) {
  const steps = document.querySelectorAll(".step");
  steps.forEach(function (ele, indx) {
    if (n === indx) {
      ele.classList.add("active");
    } else ele.classList.remove("active");
  });
}

export { setButtonsevents };
