export const createEl = (el) => document.createElement(el);
export const select = (el) => document.querySelector(el);

export const random = (min = 0, max= 10) => min + Math.floor(Math.random() * max)
export const generateId = (length = 8) => {
  const characters = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
  ];
  
  let id = ""
  for (let i = 0; i < length; i++) {
    let r = random(0, characters.length)
    id += characters[r]
  }
  
  return id
}

export const parseBlock = (block) =>  {
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
