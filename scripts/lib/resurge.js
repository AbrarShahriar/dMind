let stateHistory = [];
let undoCount = 1;
let redoCount = 1;
let cursor = 0;

const undo = () => {
  // console.log("index", cursor);
  // console.log("index", stateHistory.length - 1 - undoCount);
  // if (cursor >= stateHistory.length) {
  //   return stateHistory[0];
  // }

  // let undoState = stateHistory[stateHistory.length - 1 - undoCount];
  // undoCount--;
  if(cursor <= 0) {
    return stateHistory[0]
  }
  cursor--
  console.log("cursor position", cursor)
  return stateHistory[cursor];
};
const redo = () => {
  // let redoState = null;
  // if (stateHistory.length - undoCount <= 0) {
  //   redoCount = 1;
  // } else {
  //   redoCount = stateHistory.length - undoCount + 1;
  // }
  // if (redoCount >= stateHistory.length) {
  //   redoCount = stateHistory.length - 1;
  //   redoState = stateHistory[redoCount];
  // } else {
  //   redoState = stateHistory[redoCount];
  // }
  // console.log("index", stateHistory.length - undoCount + redoCount);
  // console.log("index", cursor);
  // if (stateHistory.length - undoCount + redoCount >= stateHistory.length) {
  //   return stateHistory[0];
  // }

  // let redoState = stateHistory[stateHistory.length - undoCount + redoCount];
  // redoCount++;
  // undoCount++;
  if(cursor >= stateHistory.length-1) {
    console.log("reached length")
    return stateHistory[stateHistory.length-1]
  }
  cursor++
  console.log("cursor position", cursor)

  return stateHistory[cursor];
};

const setState = (state) => (stateHistory = [state]);
const getStateHistory = () => stateHistory;
const addState = (curState) => {
  stateHistory.push(JSON.parse(JSON.stringify(curState)));
  cursor++
};

export const resurge = {
  undo,
  redo,
  getStateHistory,
  setState,
  addState,
};
