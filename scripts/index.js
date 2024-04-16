import { select, FloatingUI, selectAll, generateId } from "./utils.js";
import { ActionTypes, MediaTypes } from "./enums.js";
import MediaButton from "./components/MediaButton.js";
import {
  setupDb,
  renderRetrievedNoteList,
  updateCurrentNote,
  insertNewNote,
} from "./db.js";
import { dispatch, initialState } from "./state.js";
import { renderContent } from "./lib/parser.js";
import BlockArea from "./components/BlockArea.js";

// document.documentElement.style.setProperty("--editor-background", "green");

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
  undoBtn: select(".undo"),
  redoBtn: select(".redo"),
  drawer: select(".drawer"),
};

// Library Initialization
mermaid.initialize({ startOnLoad: false, theme: "dark" });
const pushbar = new Pushbar({
  blur: true,
  overlay: true,
});
const tabs = new Tabby("[data-tabs]");
dispatch({
  type: ActionTypes.SetTabs,
  payload: { tabs },
});

// Detect Click Outside Menu
document.addEventListener("click", (event) => {
  selectAll(".dropdown_trigger").forEach((trigger) => {
    const outsideClickOfTrigger = !trigger.contains(event.target);

    if (outsideClickOfTrigger) {
      FloatingUI.hideDropdown({
        dropdown: select(`.${trigger.dataset.dropdownId}`),
      });
    }
  });
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
  FloatingUI.showDropdown({
    trigger: elements.addBtn,
    dropdown: elements.dropdown,
  });
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
      type: ActionTypes.SetPreviouslyCreatedNoteOpened,
      payload: { previouslyCreatedNoteOpened: false },
    });

    elements.inputs.innerHTML = "";
    elements.content.innerHTML = "";

    tabs.toggle("#editor");
  });
});

// Add Media Buttons To Dropdown

Object.keys(MediaTypes).forEach((key) => {
  elements.dropdown.append(
    MediaButton({
      type: MediaTypes[key],
      onClick: () => {
        elements.inputs.append(
          BlockArea({
            id: generateId(),
            type: MediaTypes[key],
          })
        );
      },
    })
  );
});

// UNDO REDO

// elements.undoBtn.addEventListener("click", () => {
//   dispatch({
//     type: ActionTypes.SetEditorData,
//     payload: { editorData: resurge.undo() },
//   });
//   console.log(initialState.editorData);
//   dispatch({
//     type: ActionTypes.UpdateCurrentNoteSavedState,
//     payload: { currentNoteSaved: false },
//   });

//   select(".inputs").innerHTML = "";

//   for (const key in initialState.editorData) {
//     select(".inputs").append(
//       BlockArea({
//         id: key,
//         type: initialState.editorData[key].type,
//         defaultValue: initialState.editorData[key].value,
//       })
//     );
//   }
//   updateSaveButton();
//   autoResizeTextarea();
// });

// elements.redoBtn.addEventListener("click", () => {
//   dispatch({
//     type: ActionTypes.SetEditorData,
//     payload: { editorData: resurge.redo() },
//   });
//   console.log(initialState.editorData);
//   dispatch({
//     type: ActionTypes.UpdateCurrentNoteSavedState,
//     payload: { currentNoteSaved: false },
//   });
//   select(".inputs").innerHTML = "";

//   for (const key in initialState.editorData) {
//     select(".inputs").append(
//       BlockArea({
//         id: key,
//         type: initialState.editorData[key].type,
//         defaultValue: initialState.editorData[key].value,
//       })
//     );
//   }
//   updateSaveButton();
//   autoResizeTextarea();
// });

// resurge.setState(initialState.editorData);
// let obj = {};
// resurge.setState(obj);

// obj = { ...obj, a: 1 };

// resurge.addState(obj);
// delete obj.a;
// resurge.addState(obj);

// console.log(resurge.getStateHistory());
// console.log("UNDO", resurge.undo());
// console.log("REDO", resurge.redo());
// console.log("REDO", resurge.redo());
// console.log("REDO", resurge.redo());

// console.log("UNDO", resurge.undo());
// console.log("UNDO", resurge.undo());
