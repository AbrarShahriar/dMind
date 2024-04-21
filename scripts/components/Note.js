import Component from "../classes/Component.js";
import { deleteCurrentNode } from "../db.js";
import { ActionTypes } from "../enums.js";
import { dispatch, initialState } from "../state.js";
import { select } from "../utils.js";

const mdCharacters = ["#", "*", "_"];

export default function Note({ id, body }) {
  let note = new Component({ el: "div", classList: ["note"] });

  let noteTitle = Object.values(body)[0].value.split("\n")[0];

  let title = new Component({
    el: "span",
    classList: ["title"],
    text: `${
      mdCharacters.includes(noteTitle[0])
        ? noteTitle.slice(1, noteTitle.length).trim()
        : noteTitle
    }`,
  });

  let dltBtn = new Component({
    el: "i",
    classList: ["si-x", "btn_icon"],
    styles: { fontSize: "20px" },
  });

  title.addListener(Component.ListenerTypes.Click, () => {
    initialState.tabs.toggle("#editor");

    dispatch({
      type: ActionTypes.SetEditorData,
      payload: { editorData: body },
    });

    dispatch({
      type: ActionTypes.SetEditorDataV2,
      payload: { editorDataV2: body },
    });

    dispatch({
      type: ActionTypes.SetCurrentNoteId,
      payload: { currentNoteId: id },
    });

    dispatch({
      type: ActionTypes.SetPreviouslyCreatedNoteOpened,
      payload: { previouslyCreatedNoteOpened: true },
    });

    dispatch({
      type: ActionTypes.UpdateCurrentNoteSavedState,
      payload: { currentNoteSaved: true },
    });
  });

  dltBtn.addListener(Component.ListenerTypes.Click, async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCurrentNode(id);

        dispatch({
          type: ActionTypes.SetEditorData,
          payload: { editorData: {} },
        });

        dispatch({
          type: ActionTypes.SetEditorDataV2,
          payload: { editorDataV2: "" },
        });

        dispatch({
          type: ActionTypes.SetCurrentNoteId,
          payload: { currentNoteId: null },
        });

        dispatch({
          type: ActionTypes.SetPreviouslyCreatedNoteOpened,
          payload: { previouslyCreatedNoteOpened: false },
        });

        dispatch({
          type: ActionTypes.UpdateCurrentNoteSavedState,
          payload: { currentNoteSaved: false },
        });

        select(".content").innerHTML = "";
      }
    });
  });

  note.addChildren([title, dltBtn]);

  return note.getDomNode();
}
