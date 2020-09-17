import { bfs } from "./algorithms/bfs";
import { dijkstra } from "./algorithms/dijkstra";
import { aStar } from "./algorithms/aStar";
import { cubeSelectState as cubeSelectStateOrigin } from "./cubeSelectState";
// import { clearMemory, sleep } from "./helperFunc";

function runAlgorithm() {
  // cubeSelectStateOrigin
  let main = this;
  const canvas = document.getElementById("canv");
  const controls = document.getElementById("controls");
  this.canvas.addEventListener(
    "runAlgorithm",
    async function () {
      const algorithms = document.querySelector("#algorithms");

      if (
        typeof cubeSelectStateOrigin.startNode !== "undefined" &&
        typeof cubeSelectStateOrigin.stopNode !== "undefined"
      ) {
        //make canvas and control area unclickable during algorithm run
        canvas.style.pointerEvents = "none";
        controls.style.pointerEvents = "none";

        if (algorithms.value === "bfs") {
          await bfs.call(
            this,
            cubeSelectStateOrigin.startNode,
            cubeSelectStateOrigin.stopNode,
            cubeSelectStateOrigin.blockers
          );
        } else if (algorithms.value === "aStar") {
          await aStar.call(
            this,
            cubeSelectStateOrigin.startNode,
            cubeSelectStateOrigin.stopNode,
            cubeSelectStateOrigin.blockers
          );
        } else if (algorithms.value === "dijkstra") {
          await dijkstra.call(
            this,
            cubeSelectStateOrigin.startNode,
            cubeSelectStateOrigin.stopNode,
            cubeSelectStateOrigin.blockers
          );
        }
        cubeSelectStateOrigin.isRoundComplete = true;
        //make canvas and control area clickable again after algorithm ends
        canvas.style.pointerEvents = "auto";
        controls.style.pointerEvents = "auto";
        // clearMemory.call(this);
      }
    }.bind(main)
  );
}
export { runAlgorithm };
