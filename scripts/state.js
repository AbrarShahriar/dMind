import { ActionTypes } from "./enums.js";
import { autoResizeTextarea, select, updateSaveButton } from "./utils.js";

export let initialState = {
  editorData: {},
  editorDataV2: "",
  currentNoteSaved: false,
  dbConnection: null,
  currentNoteId: null,
  previouslyCreatedNoteOpened: false,
  tabs: null,
};

export const dispatch = (action) => {
  console.log(action.type, action.payload);

  switch (action.type) {
    case ActionTypes.SetEditorData:
      initialState = {
        ...initialState,
        editorData: action.payload.editorData,
      };

      autoResizeTextarea();
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
      updateSaveButton();
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

    case ActionTypes.SetEditorDataV2:
      initialState = {
        ...initialState,
        editorDataV2: action.payload.editorDataV2,
      };

      select(".editor_input").value = initialState.editorDataV2;

      return;

    case ActionTypes.UpdateEditorDataV2:
      initialState = {
        ...initialState,
        editorDataV2: action.payload.editorDataV2,
      };
      return;

    default:
      return initialState;
  }
};
