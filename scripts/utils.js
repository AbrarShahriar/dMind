import BlockArea from "./components/BlockArea.js";
import { ActionTypes, MediaTypes } from "./enums.js";
import { dispatch, initialState } from "./state.js";

export const createEl = (el) => document.createElement(el);
export const select = (el) => document.querySelector(el);

export const random = (min = 0, max = 10) =>
  min + Math.floor(Math.random() * max);
export const generateId = (length = 8) => {
  const characters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  let id = "";
  for (let i = 0; i < length; i++) {
    let r = random(0, characters.length);
    id += characters[r];
  }

  return id;
};

export const parseBlock = (block) => {
  let blockOutput = null;

  switch (block.type) {
    case MediaTypes.Markdown:
      let mdContainer = createEl("div");
      mdContainer.innerHTML = marked.parseInline(block.value);
      blockOutput = mdContainer;
      break;

    case MediaTypes.Latex:
      let latexContainer = createEl("div");
      latexContainer.innerHTML = katex.renderToString(block.value, {
        throwOnError: false,
      });
      blockOutput = latexContainer;
      break;

    case MediaTypes.Diagram:
      let diagramContainer = createEl("div");
      diagramContainer.style.display = "grid";
      diagramContainer.style.placeItems = "center";
      diagramContainer.innerHTML = `
      <pre class="mermaid">
        ${block.value}
      </pre>
      `;
      blockOutput = diagramContainer;

    default:
      break;
  }

  return blockOutput;
};

function update(elements) {
  FloatingUIDOM.computePosition(elements.addBtn, elements.dropdown, {
    placement: "bottom",
    middleware: [
      FloatingUIDOM.offset(5),
      FloatingUIDOM.flip(),
      FloatingUIDOM.shift({ padding: 10 }),
    ],
  }).then(({ x, y }) => {
    Object.assign(elements.dropdown.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  });
}

function showDropdown(elements) {
  elements.dropdown.style.display = "flex";
  update(elements);
}

function hideDropdown(elements) {
  elements.dropdown.style.display = "";
}

export const FloatingUI = {
  update,
  showDropdown,
  hideDropdown,
};

export const handleAddBtnClick = ({ type }) => {
  select(".inputs").append(
    BlockArea({
      id: generateId(),
      type,
    })
  );
};

// Render Content

export async function renderContent(data = initialState.editorData) {
  const content = select(".content");
  content.innerHTML = "";

  for (let blockId in data) {
    content.append(parseBlock(data[blockId]));
  }

  await mermaid.run();
}
