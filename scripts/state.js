import { ActionTypes } from "./enums.js";

export let initialState = {
  editorData: {},
  currentNoteSaved: false,
  dbConnection: null,
  currentNoteId: null,
};

export const dispatch = (action) => {
  console.log(action);

  switch (action.type) {
    case ActionTypes.SetEditorData:
      initialState = {
        ...initialState,
        editorData: action.payload.editorData,
      };
      return;

    case ActionTypes.UpdateEditorData:
      initialState = {
        ...initialState,
        editorData: {
          ...initialState.editorData,
          [action.payload.id]: {
            type: action.payload.mediaType,
            value: action.payload.value,
          },
        },
      };
      return;

    case ActionTypes.UpdateCurrentNoteSavedState:
      initialState = {
        ...initialState,
        currentNoteSaved: action.payload.currentNoteSaved,
      };
      return;

    case ActionTypes.SetDbConnection:
      initialState = {
        ...initialState,
        dbConnection: action.payload.dbConnection,
      };
      return;

    case ActionTypes.SetCurrentNoteId:
      initialState = {
        ...initialState,
        currentNoteId: action.payload.currentNoteId,
      };
      return;

    default:
      return initialState;
  }
};
