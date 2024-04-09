import { createEl } from "../utils.js"

export default function BlockArea({ id, uiData }) {
  let textarea = createEl("textarea")
  textarea.classList.add(id)
  
  textarea.addEventListener("change", e => {
    uiData[id] = {
      ...uiData[id],
      value: e.target.value.replace(/\n/g, '<br>\n')
    }
  })
  
  return textarea
}