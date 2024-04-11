import { select, FloatingUI, renderContent } from "./utils.js";
import { MediaTypes } from "./enums.js";
import MediaButton from "./components/MediaButton.js";

const elements = {
  content: select(".content"),
  editor: select(".editor"),
  addBtn: select(".btn_add-media"),
  renderBtn: select(".btn_render"),
  dropdown: select(".dropdown"),
};

// Detect Click Outside Menu
document.addEventListener("click", function (event) {
  const outsideClick = !elements.addBtn.contains(event.target);

  if (outsideClick) {
    FloatingUI.hideDropdown(elements);
  }
});

// Library Initialization
mermaid.initialize({ startOnLoad: false, theme: "dark" });

// Event Listeners
elements.addBtn.addEventListener("click", () => {
  FloatingUI.showDropdown(elements);
});

elements.renderBtn.addEventListener("click", async () => {
  await renderContent();
});

Object.keys(MediaTypes).forEach((key) => {
  elements.dropdown.append(MediaButton({ type: MediaTypes[key] }));
});
