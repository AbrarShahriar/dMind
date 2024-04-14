import { ActionTypes } from "../enums.js";
import { resurge } from "../lib/resurge.js";
import { dispatch, initialState } from "../state.js";
import {
  autoResizeTextarea,
  createEl,
  select,
  updateSaveButton,
} from "../utils.js";

export default function BlockArea({ id, type, defaultValue = "" }) {
  let container = createEl("div");
  container.classList.add("input");
  container.classList.add(`input-${id}`);

  let actions = createEl("div");
  actions.classList.add("block_actions");

  let typeSpan = createEl("span");
  typeSpan.classList.add("type_span");
  typeSpan.innerText = type;

  let p = createEl("p");
  p.classList.add(id);
  p.contentEditable = true;

  if (defaultValue) {
    p.innerText = defaultValue;
  }

  p.addEventListener("input", (e) => {
    dispatch({
      type: ActionTypes.UpdateCurrentNoteSavedState,
      payload: { currentNoteSaved: false },
    });

    updateSaveButton();

    autoResizeTextarea(e, id, type);
  });

  let dltBtn = createEl("button");
  dltBtn.classList.add("btn_delete");
  dltBtn.innerHTML = `<i class="si-trash"></i>`;

  dltBtn.addEventListener("click", (e) => {
    // save current state before deleting for undo/redo
    resurge.addState(initialState.editorData);

    // after saving state. now delete data
    dispatch({
      type: ActionTypes.UpdateEditorData,
      payload: {
        mediaType: type,
        id,
        value: "",
      },
    });

    select(`.input-${id}`).remove();

    delete initialState.editorData[id];
    resurge.addState(initialState.editorData);
    console.log(resurge.getStateHistory());
  });

  actions.append(typeSpan);
  actions.append(dltBtn);

  container.append(p);
  container.append(actions);
  return container;
}
