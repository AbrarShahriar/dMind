import { ActionTypes, MediaTypes } from "../enums.js";
import { dispatch } from "../state.js";
import { createEl, select } from "../utils.js";

export default function BlockArea({ id, type }) {
  let container = createEl("div");
  container.classList.add("input");
  container.classList.add(`input-${id}`);

  let textarea = createEl("textarea");
  textarea.classList.add(id);

  textarea.addEventListener("input", autoResize, false);

  function autoResize() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }

  textarea.addEventListener("change", (e) => {
    dispatch({
      type: ActionTypes.UpdateEditorData,
      payload: {
        mediaType: type,
        id,
        value:
          type == MediaTypes.Diagram
            ? e.target.value
            : e.target.value.replace(/\n/g, "<br>\n"),
      },
    });
  });

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

  container.append(textarea);
  container.append(dltBtn);
  return container;
}
