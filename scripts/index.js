import { createEl, select, parseBlock, generateId } from "./utils.js"
import BlockArea from "./components/BlockArea.js"

const elements = {
  content: select(".content"),
  editor: select(".editor"),
  addBtn: select(".add"),
  renderBtn: select(".render")
}

// Library Initialization
mermaid.initialize({startOnLoad: false })

const testData = {
  "abx": {
    type: "markdown",
    value: "# Marked in the browser\n\nRendered by **marked**.",
  },
  "xyz": {
    type: "latex",
    value: "\\int_0^1 f(x) dx",
  },
  "pqr": {
    type: "diagram",
    value: `flowchart LR 
    Start --> Stop`,
  },
};

let uiData = {}

// Event Listeners
elements.addBtn.addEventListener("click", () => {
  const id = generateId()
  
  uiData[id] = {
    type: "markdown",
    value: ""
  }
  
  elements.editor.append(BlockArea({
    id, uiData
  }))
})

elements.renderBtn.addEventListener("click", async () => {
  await renderContent(uiData);
})

async function renderContent(data) {
  elements.content.innerHTML = ""
  
  for (let blockId in data) {
    elements.content.append(parseBlock(data[blockId]))
  }
  
  await mermaid.run();
}