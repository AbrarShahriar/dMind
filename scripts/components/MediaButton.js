import Component from "../classes/Component.js";

export default function MediaButton({ type, onClick }) {
  const button = new Component({
    el: "button",
    classList: ["dropdown_btn", type],
    text: type,
  });

  button.addListener(Component.ListenerTypes.Click, onClick);

  return button.getDomNode();
}
