import { ActionTypes, MediaTypes } from "../enums.js";
import { dispatch } from "../state.js";
import { autoResizeTextarea, createEl, select } from "../utils.js";

export default function BlockArea({ id, type, defaultValue = "" }) {
  let container = createEl("div");
  container.classList.add("input");
  container.classList.add(`input-${id}`);

  let textarea = createEl("textarea");
  textarea.classList.add(id);

  let span = createEl("p");
  span.classList.add(id);
  span.contentEditable = true;

  if (defaultValue) {
    span.innerText = defaultValue;
    textarea.value = defaultValue;
  }

  textarea.addEventListener("input", () => autoResizeTextarea());
  textarea.addEventListener("change", (e) => autoResizeTextarea(e, id, type));
  span.addEventListener("input", (e) => autoResizeTextarea(e, id, type));
  // span.addEventListener("change", (e) => autoResizeTextarea(e, id, type));

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
  });

  // container.append(textarea);
  container.append(span);
  container.append(dltBtn);
  return container;
}
