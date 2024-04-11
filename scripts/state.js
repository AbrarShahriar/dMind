import { ActionTypes } from "./enums.js";

export let initialState = {
  editorData: {},
};

export const dispatch = (action) => {
  console.log(action);
  switch (action.type) {
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
      return initialState;

    default:
      return initialState;
  }
};
