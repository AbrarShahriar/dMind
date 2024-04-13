import { ActionTypes } from "../enums.js";
import { dispatch } from "../state.js";
import { autoResizeTextarea, createEl, select } from "../utils.js";
import BlockArea from "./BlockArea.js";

export default function Note({ id, body }) {
  
  let note = createEl("div");
  note.classList.add("note");

  let title = createEl("span");
  title.classList.add("title");
  title.innerText = `Note ${id}`;

  note.addEventListener("click", () => {
    dispatch({
      type: ActionTypes.SetEditorData,
      payload: { editorData: body },
    });

    dispatch({
      type: ActionTypes.SetCurrentNoteId,
      payload: { currentNoteId: id },
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

    autoResizeTextarea();
  });

  note.append(title);

  return note;
}
