const createEl = (el) => document.createElement(el);
const select = (el) => document.querySelector(el);

const testData = [
  {
    type: "markdown",
    value: "# Marked in the browser\n\nRendered by **marked**.",
  },
  {
    type: "diagram",
    value: `mindmap
    root((mindmap))
      Origins
        Long history
        ::icon(fa fa-book)
        Popularisation
          British popular psychology author Tony Buzan
      Research
        On effectiveness<br/>and features
        On Automatic creation
          Uses
              Creative techniques
              Strategic planning
              Argument mapping
      Tools
        Pen and paper
        Mermaid
  
  `,
  },
  {
    type: "latex",
    value: "\\int_0^1 f(x) dx",
  },
  {
    type: "diagram",
    value: `flowchart LR 
    Start --> Stop`,
  },
];

main(testData);

function main(data) {
  let content = select(".content");
  data.forEach((block) => content.append(parseBlock(block)));
}

function parseBlock(block) {
  let blockOutput = null;

  switch (block.type) {
    case "markdown":
      let mdContainer = createEl("div");
      mdContainer.innerHTML = marked.parse(block.value);
      blockOutput = mdContainer;
      break;

    case "latex":
      let latexContainer = createEl("div");
      latexContainer.innerHTML = katex.renderToString(block.value, {
        throwOnError: false,
      });
      blockOutput = latexContainer;
      break;

    case "diagram":
      let diagramContainer = createEl("div");
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
}
