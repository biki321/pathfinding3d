import { bfs } from "./algorithms/bfs";
import { dijkstra } from "./algorithms/dijkstra";
import { aStar } from "./algorithms/aStar";
import { cubeSelectState as cubeSelectStateOrigin } from "./cubeSelectState";
// import { clearMemory, sleep } from "./helperFunc";

function runAlgorithm() {
  // cubeSelectStateOrigin
  let main = this;
  console.log(main.canvas);
  const canvas = document.getElementById("canv");
  const controls = document.getElementById("controls");
  this.canvas.addEventListener(
    "runAlgorithm",
    async function () {
      const algorithms = document.querySelector("#algorithms");

      console.log("runAlgorithm1");
      if (
        typeof cubeSelectStateOrigin.startNode !== "undefined" &&
        typeof cubeSelectStateOrigin.stopNode !== "undefined"
      ) {
        //make canvas and control area unclickable during algorithm run
        canvas.style.pointerEvents = "none";
        controls.style.pointerEvents = "none";

        console.log("under the runAlgorithm1");
        console.log(`event of runAlgo : ${event.algorithm}`);
        if (algorithms.value === "bfs") {
          console.log("bfs in run ");
          await bfs.call(
            this,
            cubeSelectStateOrigin.startNode,
            cubeSelectStateOrigin.stopNode,
            cubeSelectStateOrigin.blockers
          );
        } else if (algorithms.value === "aStar") {
          console.log("astar");
          await aStar.call(
            this,
            cubeSelectStateOrigin.startNode,
            cubeSelectStateOrigin.stopNode,
            cubeSelectStateOrigin.blockers
          );
        } else if (algorithms.value === "dijkstra") {
          console.log("dijkstra");
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
