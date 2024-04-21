import { autoResizeTextarea, select, selectAll } from "./utils.js";
import { ActionTypes } from "./enums.js";
import {
  setupDb,
  renderRetrievedNoteList,
  updateCurrentNote,
  insertNewNote,
} from "./db.js";
import { dispatch, initialState } from "./state.js";
import Theme from "./classes/Theme.js";
import { parseMd } from "./parser/parser.js";

// Set Theme
const theme = new Theme();
theme.setTheme("dark");

const elements = {
  content: select(".content"),
  editor: select(".editor"),
  editorInput: select(".editor_input"),
  renderBtn: select(".btn_render"),
  saveBtn: select(".btn_save"),
  noteList: select(".note_list"),
  newNoteBtnList: selectAll(".btn_new_note"),
  drawer: select(".drawer"),
};

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

    autoResizeTextarea();
  })
  .catch((err) => console.error(err));

// Event Listeners
elements.editorInput.addEventListener("input", (e) => {
  autoResizeTextarea(e, () => {
    dispatch({
      type: ActionTypes.UpdateEditorDataV2,
      payload: { editorDataV2: e.target.value },
    });
    dispatch({
      type: ActionTypes.UpdateCurrentNoteSavedState,
      payload: { currentNoteSaved: false },
    });
  });
});

elements.renderBtn.addEventListener("click", async () => {
  elements.content.innerHTML = parseMd(initialState.editorDataV2);
  hljs.highlightAll();
  renderMathInElement(elements.content, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
    ],
    throwOnError: false,
  });
  await mermaid.run();
});

elements.saveBtn.addEventListener("click", async () => {
  let noOfRowsUpdated = 0;
  let newlyCreatedNote = null;

  const isEditorEmpty = initialState.editorDataV2 == "" ? true : false;

  if (isEditorEmpty) {
    return Swal.fire({
      icon: "error",
      text: "Write Something!",
    });
  }

  if (initialState.previouslyCreatedNoteOpened || initialState.currentNoteId) {
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

  return;
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
      type: ActionTypes.SetEditorDataV2,
      payload: { editorDataV2: "" },
    });
    dispatch({
      type: ActionTypes.SetPreviouslyCreatedNoteOpened,
      payload: { previouslyCreatedNoteOpened: false },
    });

    elements.content.innerHTML = "";

    tabs.toggle("#editor");
  });
});
