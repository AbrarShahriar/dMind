import { ActionTypes } from "./enums.js";

export let initialState = {
  editorData: {},
  currentNoteSaved: false,
  dbConnection: null,
  currentNoteId: null,
  previouslyCreatedNoteOpened: false,
  tabs: null,
};

export const dispatch = (action) => {
  // console.log(action);

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

    case ActionTypes.SetPreviouslyCreatedNoteOpened:
      initialState = {
        ...initialState,
        previouslyCreatedNoteOpened: action.payload.previouslyCreatedNoteOpened,
      };
      return;

    case ActionTypes.SetTabs:
      initialState = {
        ...initialState,
        tabs: action.payload.tabs,
      };
      return;

    default:
      return initialState;
  }
};
