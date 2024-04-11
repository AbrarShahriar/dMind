import { createEl, select, parseBlock, generateId, FloatingUI } from "./utils.js"
import BlockArea from "./components/BlockArea.js"

const elements = {
  content: select(".content"),
  editor: select(".editor"),
  addBtn: select(".add"),
  renderBtn: select(".render"),
  dropdown: select(".dropdown"),
  markdownBtn: select(".markdown"),
  latexBtn: select(".latex"),
  diagramBtn: select(".diagram")
}

document.addEventListener('click', function(event) {
  const outsideClick = !elements.addBtn.contains(event.target);
  
  if(outsideClick) {
    FloatingUI.hideDropdown(elements)
  }
});

// Library Initialization
mermaid.initialize({startOnLoad: false })

// Initial State
let uiData = {}

// Event Listeners
elements.addBtn.addEventListener("click", () => {
  FloatingUI.showDropdown(elements)
})

elements.renderBtn.addEventListener("click", async () => {
  await renderContent(uiData);
})

elements.markdownBtn.addEventListener("click", () => {
  const id = generateId()
  
  uiData[id] = {
    type: "markdown",
    value: ""
  }
  
  elements.editor.append(BlockArea({
    id, uiData, type: "markdown"
  }))
})

elements.latexBtn.addEventListener("click", () => {
  const id = generateId()
  
  uiData[id] = {
    type: "latex",
    value: ""
  }
  
  elements.editor.append(BlockArea({
    id, uiData, type: "latex"
  }))
})

elements.diagramBtn.addEventListener("click", () => {
  const id = generateId()
  
  uiData[id] = {
    type: "diagram",
    value: ""
  }
  
  elements.editor.append(BlockArea({
    id, uiData, type: "diagram"
  }))
})

async function renderContent(data) {
  elements.content.innerHTML = ""
  
  for (let blockId in data) {
    elements.content.append(parseBlock(data[blockId]))
  }
  
  await mermaid.run();
}