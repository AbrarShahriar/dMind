import {
  select,
  FloatingUI,
  renderContent,
  updateSaveButton,
  selectAll,
} from "./utils.js";
import { ActionTypes, MediaTypes } from "./enums.js";
import MediaButton from "./components/MediaButton.js";
import {
  setupDb,
  renderRetrievedNoteList,
  updateCurrentNote,
  insertNewNote,
} from "./db.js";
import { dispatch, initialState } from "./state.js";

const elements = {
  content: select(".content"),
  editor: select(".editor"),
  addBtn: select(".btn_add-media"),
  renderBtn: select(".btn_render"),
  saveBtn: select(".btn_save"),
  dropdown: select(".dropdown"),
  noteList: select(".note_list"),
  inputs: select(".inputs"),
  newNoteBtnList: selectAll(".btn_new_note"),
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
const tabs = new Tabby("[data-tabs]");
dispatch({
  type: ActionTypes.SetTabs,
  payload: { tabs },
});

// DB Initialization
setupDb()
  .then(async (con) => {
    dispatch({
      type: ActionTypes.SetDbConnection,
      payload: { dbConnection: con },
    });
    await renderRetrievedNoteList();
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
  let noOfRowsUpdated = 0;
  let newlyCreatedNote = null;

  const isEditorEmpty =
    Object.keys(initialState.editorData).length <= 0 ? true : false;

  if (isEditorEmpty) {
    return Toastify({
      text: "Write Something!",
      duration: 2000,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#b14b34",
      },
    }).showToast();
  }

  if (initialState.previouslyCreatedNoteOpened) {
    noOfRowsUpdated = await updateCurrentNote();
  } else {
    newlyCreatedNote = await insertNewNote();
  }

  if (newlyCreatedNote && newlyCreatedNote[0]) {
    dispatch({
      type: ActionTypes.UpdateCurrentNoteSavedState,
      payload: { currentNoteSaved: true },
    });
    dispatch({
      type: ActionTypes.SetCurrentNoteId,
      payload: { currentNoteId: newlyCreatedNote[0].id },
    });
  }

  if (noOfRowsUpdated > 0) {
    dispatch({
      type: ActionTypes.UpdateCurrentNoteSavedState,
      payload: { currentNoteSaved: true },
    });
  }

  await renderRetrievedNoteList();
  return updateSaveButton();
});

elements.newNoteBtnList.forEach((newNoteBtn) => {
  newNoteBtn.addEventListener("click", () => {
    dispatch({
      type: ActionTypes.UpdateCurrentNoteSavedState,
      payload: { currentNoteSaved: false },
    });
    dispatch({
      type: ActionTypes.SetCurrentNoteId,
      payload: { currentNoteId: null },
    });
    dispatch({
      type: ActionTypes.SetEditorData,
      payload: { editorData: {} },
    });
    dispatch({
      type: ActionTypes.SetPreviouslyCreatedNoteOpened,
      payload: { previouslyCreatedNoteOpened: false },
    });

    elements.inputs.innerHTML = "";
    elements.content.innerHTML = "";

    updateSaveButton();
    tabs.toggle("#editor");
  });
});

// Add Media Buttons To Dropdown

Object.keys(MediaTypes).forEach((key) => {
  elements.dropdown.append(MediaButton({ type: MediaTypes[key] }));
});
