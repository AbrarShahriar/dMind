import { select, FloatingUI, renderContent } from "./utils.js";
import { ActionTypes, MediaTypes } from "./enums.js";
import MediaButton from "./components/MediaButton.js";
import { setupDb } from "./db.js";
import { dispatch, initialState } from "./state.js";
import Note from "./components/Note.js";

const elements = {
  content: select(".content"),
  editor: select(".editor"),
  addBtn: select(".btn_add-media"),
  renderBtn: select(".btn_render"),
  saveBtn: select(".btn_save"),
  dropdown: select(".dropdown"),
  noteList: select(".note_list"),
  inputs: select(".inputs"),
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
new Pushbar({
  blur: true,
  overlay: true,
});
new Tabby("[data-tabs]");

// DB Initialization
setupDb()
  .then(async (con) => {
    dispatch({
      type: ActionTypes.SetDbConnection,
      payload: { dbConnection: con },
    });

    const results = await con.select({
      from: "Notes",
    });

    results.forEach((note) => {
      elements.noteList.append(Note({ id: note.id, body: note.body }));
    });
  })
  .catch((err) => console.error(err));

// Event Listeners
elements.addBtn.addEventListener("click", () => {
  FloatingUI.showDropdown(elements);
});

elements.renderBtn.addEventListener("click", async () => {
  await renderContent();
});

elements.saveBtn.addEventListener("click", async () => {
  let noOfRowsInsertedOrUpdated = 0;

  const isEditorEmpty =
    Object.keys(initialState.editorData).length <= 0 ? true : false;

  if (isEditorEmpty) {
    return alert("Write Something!");
  }

  const noteAlreadyExists = await initialState.dbConnection.select({
    from: "Notes",
    where: {
      id: initialState.currentNoteId,
    },
  });

  if (noteAlreadyExists[0]) {
    noOfRowsInsertedOrUpdated = await initialState.dbConnection.update({
      in: "Notes",
      where: {
        id: initialState.currentNoteId,
      },
      set: {
        updatedAt: new Date(),
        body: initialState.editorData,
      },
    });
    return;
  }

  noOfRowsInsertedOrUpdated = await initialState.dbConnection.insert({
    into: "Notes",
    values: [
      {
        body: initialState.editorData,
      },
    ],
  });

  if (noOfRowsInsertedOrUpdated > 0) {
    dispatch({
      type: ActionTypes.UpdateCurrentNoteSavedState,
      payload: { currentNoteSaved: true },
    });
    updateSaveButton();
  }
});

Object.keys(MediaTypes).forEach((key) => {
  elements.dropdown.append(MediaButton({ type: MediaTypes[key] }));
});

function updateSaveButton() {
  if (initialState.currentNoteSaved) {
    elements.saveBtn.innerHTML = `<i class="btn_icon si-check"></i>`;
    elements.saveBtn.disabled = true;
  } else {
    elements.saveBtn.innerHTML = `<i class="btn_icon si-disk"></i>`;
    elements.saveBtn.disabled = false;
  }
}
