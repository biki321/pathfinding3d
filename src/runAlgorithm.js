import { bfs } from "./algorithms/bfs";
import { dijkstra } from "./algorithms/dijkstra";
import { aStar } from "./algorithms/aStar";
import { cubeSelectState as cubeSelectStateOrigin } from "./cubeSelectState";
import { clearMemory } from "./helperFunc";

function runAlgorithm() {
  // cubeSelectStateOrigin
  let main = this;
  console.log(main.canvas);
  this.canvas.addEventListener(
    "runAlgorithm",
    async function () {
      const algorithms = document.querySelector("#algorithms");

      console.log("runAlgorithm1");
      if (
        typeof cubeSelectStateOrigin.startNode !== "undefined" &&
        typeof cubeSelectStateOrigin.stopNode !== "undefined"
      ) {
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
        console.log("clearMem");
        clearMemory.call(this);
      }
    }.bind(main)
  );
}
export { runAlgorithm };
