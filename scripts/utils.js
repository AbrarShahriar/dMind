import { ActionTypes } from "./enums.js";
import { dispatch, initialState } from "./state.js";

export const createEl = (el) => document.createElement(el);
export const select = (el) => document.querySelector(el);
export const selectAll = (el) => document.querySelectorAll(el);

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

export const autoResizeTextarea = (e, id, type, dispatchFunc) => {
  const tx = selectAll(".inputs p");

  tx.forEach((textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
    textarea.scrollTop = textarea.scrollHeight;
  });

  if (e) {
    dispatchFunc();
    // dispatch({
    //   type: ActionTypes.UpdateEditorData,
    //   payload: {
    //     mediaType: type,
    //     id,
    //     value: e.target.innerText,
    //   },
    // });
  }
};

export const updateSaveButton = () => {
  const saveBtn = select(".btn_save");
  if (initialState.currentNoteSaved) {
    saveBtn.innerHTML = `<i class="btn_icon si-check"></i>`;
    saveBtn.disabled = true;
  } else {
    saveBtn.innerHTML = `<i class="btn_icon si-disk"></i>`;
    saveBtn.disabled = false;
  }
};

function update({trigger, dropdown}) {
  FloatingUIDOM.computePosition(trigger, dropdown, {
    placement: "bottom",
    middleware: [
      FloatingUIDOM.offset(5),
      FloatingUIDOM.flip(),
      FloatingUIDOM.shift({ padding: 10 }),
    ],
  }).then(({ x, y }) => {
    Object.assign(dropdown.style, {
      left: `${x}px`,
      top: `${y}px`,
      display: "flex",
    });
  });
}

function showDropdown({trigger, dropdown}) {
  
  dropdown.style.display = "flex";
  update({trigger, dropdown});
}

function hideDropdown({dropdown}) {
  dropdown.style.display = "none";
}

function hideDropdownAll() {
  selectAll(".dropdown").forEach(dropdown => hideDropdown({dropdown}))
}

export const FloatingUI = {
  update,
  showDropdown,
  hideDropdown,
  hideDropdownAll
};
