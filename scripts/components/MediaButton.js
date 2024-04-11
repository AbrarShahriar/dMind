import { createEl, handleAddBtnClick } from "../utils.js";

export default function MediaButton({ type }) {
  const button = createEl("button");
  button.classList.add("dropdown_btn");
  button.classList.add(type);

  button.innerText = type;

  button.addEventListener("click", () => handleAddBtnClick({ type }));

  return button;
}
