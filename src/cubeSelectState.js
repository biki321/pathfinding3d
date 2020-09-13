let cubeSelectState = {
  //string data
  selectState: undefined,
  //array
  startNode: undefined,
  stopNode: undefined,
  //Set
  blockers: undefined,
};

function disposeCubeSelectState() {
  cubeSelectState.selectState = undefined;
  cubeSelectState.startNode = undefined;
  cubeSelectState.stopNode = undefined;
  cubeSelectState.blockers = undefined;
}
export { cubeSelectState, disposeCubeSelectState };
