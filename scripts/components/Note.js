import { deleteCurrentNode } from "../db.js";
import { ActionTypes } from "../enums.js";
import { dispatch, initialState } from "../state.js";
import {
  autoResizeTextarea,
  createEl,
  select,
  updateSaveButton,
} from "../utils.js";
import BlockArea from "./BlockArea.js";

const mdCharacters = ["#", "*", "_"];

export default function Note({ id, body }) {
  let note = createEl("div");
  note.classList.add("note");

  let noteTitle = Object.values(body)[0].value.split("\n")[0];

  let title = createEl("span");
  title.classList.add("title");
  title.innerText = `${
    mdCharacters.includes(noteTitle[0])
      ? noteTitle.slice(1, noteTitle.length).trim()
      : noteTitle
  }`;

  let dltBtn = createEl("i");
  dltBtn.classList.add("si-x", "btn_icon");
  dltBtn.style.fontSize = "20px";

  title.addEventListener("click", () => {
    dispatch({
      type: ActionTypes.SetEditorData,
      payload: { editorData: body },
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

    select(".inputs").innerHTML = "";

    for (const key in body) {
      select(".inputs").append(
        BlockArea({
          id: key,
          type: body[key].type,
          defaultValue: body[key].value,
        })
      );
    }

    initialState.tabs.toggle("#editor");

    updateSaveButton();

    autoResizeTextarea();
  });

  dltBtn.addEventListener("click", async () => {
    await deleteCurrentNode(id);

    dispatch({
      type: ActionTypes.SetEditorData,
      payload: { editorData: {} },
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

    select(".inputs").innerHTML = "";
    select(".content").innerHTML = "";
  });

  note.append(title);
  note.append(dltBtn);

  return note;
}
