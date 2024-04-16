import { createEl } from "../utils.js";

export default class Component {
  static ListenerTypes = {
    Click: "click",
    Input: "input",
    Change: "change",
  };

  constructor({
    el,
    classList,
    text = "",
    _html = "",
    modifier = {},
    styles = {},
    dataset = {}
  }) {
    this.createdEl = createEl(el);

    if (classList) {
      this.createdEl.classList.add(...classList);
    }

    if (text) {
      this.createdEl.innerText = text;
    }

    if (_html) {
      this.createdEl.innerHTML = _html;
    }

    if (modifier) {
      for (const key in modifier) {
        this.createdEl[key] = modifier[key];
      }
    }

    if (styles) {
      for (const key in styles) {
        this.createdEl.style[key] = styles[key];
      }
    }
    
    if(dataset) {
      for (const key in dataset) {
        this.createdEl.dataset[key] = dataset[key];
      }
    }
  }

  addChildren(children) {
    children.forEach((child) =>
      child.getDomNode
        ? this.createdEl.append(child.getDomNode())
        : this.createdEl.append(child)
    );
  }

  addChild(child) {
    if (child.getDomNode) {
      this.createdEl.append(child.getDomNode());
    } else {
      this.createdEl.append(child);
    }
  }

  addListener(listenerType, callback) {
    this.createdEl.addEventListener(listenerType, callback);
  }

  getDomNode() {
    return this.createdEl;
  }

  setText(text) {
    this.createdEl.innerText = text;
  }

  _setHTML(html) {
    this.createdEl.innerHTML = html;
  }
}
