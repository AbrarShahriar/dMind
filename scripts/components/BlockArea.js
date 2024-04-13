import { ActionTypes, MediaTypes } from "../enums.js";
import { dispatch, initialState } from "../state.js";
import { autoResizeTextarea, createEl, select } from "../utils.js";

export default function BlockArea({ id, type, defaultValue = "" }) {
  let container = createEl("div");
  container.classList.add("input");
  container.classList.add(`input-${id}`);

  let p = createEl("p");
  p.classList.add(id);
  p.contentEditable = true;

  if (defaultValue) {
    p.innerText = defaultValue;
  }

  p.addEventListener("input", (e) => autoResizeTextarea(e, id, type));

  let dltBtn = createEl("button");
  dltBtn.classList.add("btn_danger");
  dltBtn.classList.add("btn_delete");
  dltBtn.innerHTML = `<i class="si-trash"></i>`;

  dltBtn.addEventListener("click", (e) => {
    dispatch({
      type: ActionTypes.UpdateEditorData,
      payload: {
        mediaType: type,
        id,
        value: "",
      },
    });

    select(`.input-${id}`).remove();
    delete initialState.editorData[id]
  });

  container.append(p);
  container.append(dltBtn);
  return container;
}
