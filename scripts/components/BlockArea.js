import Component from "../classes/Component.js";
import { ActionTypes, MediaTypes } from "../enums.js";
import { dispatch, initialState } from "../state.js";
import { FloatingUI, autoResizeTextarea, select } from "../utils.js";
import MediaButton from "./MediaButton.js";

export default function BlockArea({ id, type, defaultValue = "" }) {
  let typeState = type;

  let container = new Component({
    el: "div",
    classList: ["input", `input-${id}`],
  });

  let actions = new Component({ el: "div", classList: ["block_actions"] });

  let typeSpan = new Component({
    el: "div",
    classList: ["type_span", "dropdown_trigger"],
    text: type,
  });

  let typeDropdown = new Component({
    el: "div",
    classList: ["dropdown", "type_dropdown", id],
    dataset: { dropdownId: id }
  });

  Object.keys(MediaTypes).forEach((key) => {
    typeDropdown.addChild(
      MediaButton({
        type: MediaTypes[key],
        onClick: () => {
          // console.log("BEFORE", initialState.editorData[id]);
          dispatch({
            type: ActionTypes.UpdateEditorData,
            payload: {
              mediaType: MediaTypes[key],
              id,
              value: initialState.editorData[id].value,
            },
          });
          dispatch({
            type: ActionTypes.UpdateCurrentNoteSavedState,
            payload: {
              currentNoteSaved: false,
            },
          });
          typeState = MediaTypes[key];
          typeSpan.setText(MediaTypes[key]);
          // console.log("AFTER", initialState.editorData[id]);
          FloatingUI.hideDropdown({dropdown: dropdown.getDomNode()});
        },
      })
    );
  });

  typeSpan.addListener(Component.ListenerTypes.Click, () => {
    FloatingUI.showDropdown({trigger: typeSpan.getDomNode(), dropdown: typeDropdown.getDomNode()});
  });

  let p = new Component({
    el: "p",
    classList: [id],
    modifier: { contentEditable: true },
  });

  if (defaultValue) {
    p.setText(defaultValue);
  }

  p.addListener(Component.ListenerTypes.Input, (e) => {
    dispatch({
      type: ActionTypes.UpdateCurrentNoteSavedState,
      payload: { currentNoteSaved: false },
    });

    autoResizeTextarea(e, id, typeState, () => {
      dispatch({
        type: ActionTypes.UpdateEditorData,
        payload: {
          mediaType: typeState,
          id,
          value: e.target.innerText,
        },
      });
    });
  });

  let dltBtn = new Component({ el: "button", classList: ["btn_delete"] });
  dltBtn._setHTML(`<i class="si-trash"></i>`);
  dltBtn.addListener(Component.ListenerTypes.Click, (e) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: ActionTypes.UpdateEditorData,
          payload: {
            mediaType: type,
            id,
            value: "",
          },
        });

        select(`.input-${id}`).remove();

        delete initialState.editorData[id];
      }
    });
  });

  actions.addChildren([typeSpan, typeDropdown, dltBtn]);
  container.addChildren([p, actions]);

  return container.getDomNode();
}
