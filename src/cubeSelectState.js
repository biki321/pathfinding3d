let cubeSelectState = {
  //string data
  selectState: undefined,
  //array
  startNode: undefined,
  startNodeObj: undefined,
  stopNode: undefined,
  stopNodeObj: undefined,
  //Set
  blockers: undefined,
};

function disposeCubeSelectState() {
  cubeSelectState.selectState = undefined;
  cubeSelectState.startNode = undefined;
  cubeSelectState.stopNode = undefined;
  cubeSelectState.blockers = undefined;
  cubeSelectState.startNodeObj = undefined;
  cubeSelectState.stopNodeObj = undefined;
}
export { cubeSelectState, disposeCubeSelectState };
