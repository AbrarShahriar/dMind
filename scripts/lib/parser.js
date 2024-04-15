import { MediaTypes } from "../enums.js";
import { initialState } from "../state.js";
import { createEl, select } from "../utils.js";
import { ttable } from "./ttable.js";

export async function renderContent() {
  const editorDataArray = Object.keys(initialState.editorData).filter(
    (el) => el != "undefined" && el
  );

  const content = select(".content");
  content.innerHTML = "";

  editorDataArray.forEach((key) =>
    content.append(parseBlock(initialState.editorData[key]))
  );

  renderMathInElement(select(".content"), {
    delimiters: [{ left: "$$", right: "$$", display: false }],
    throwOnError: false,
  });

  hljs.highlightAll();

  await mermaid.run();
}

export const parseBlock = (block) => {
  let blockOutput = null;

  switch (block.type) {
    case MediaTypes.Markdown:
      let mdContainer = createEl("div");
      mdContainer.innerHTML = customParser(block.value);
      blockOutput = mdContainer;
      break;

    case MediaTypes.Table:
      let tableContainer = createEl("div");

      tableContainer.innerHTML = ttable.toHtml(block.value);

      blockOutput = tableContainer;
      break;

    case MediaTypes.Code:
      let codeContainer = createEl("div");

      const lang = block.value.split("\n")[0];

      codeContainer.innerHTML = `
      <pre>
        <code class="language-${lang}">${block.value
        .split("\n")
        .slice(1, block.value.length)
        .join("\n")}</code>
      </pre>
      `;

      blockOutput = codeContainer;
      break;

    case MediaTypes.Latex:
      let latexContainer = createEl("div");
      latexContainer.innerHTML = katex.renderToString(block.value, {
        throwOnError: false,
        displayMode: true,
      });
      latexContainer.style.fontSize = "1.1em";
      latexContainer.style.textAlign = "center";

      blockOutput = latexContainer;
      break;

    case MediaTypes.Diagram:
      let diagramContainer = createEl("div");
      diagramContainer.style.display = "grid";
      diagramContainer.style.placeItems = "center";
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
};

const customParser = (text) => {
  const lines = text.split("\n");

  const parsedText = lines
    .map((line, index) => {
      // Check if the line is part of a list
      const isListItem = /^\s*[*\-+]\s+|^\s*\d+\.\s+/.test(line);
      const isNextLineListItem =
        index < lines.length - 1 &&
        /^\s*[*\-+]\s+|^\s*\d+\.\s+/.test(lines[index + 1]);

      if (isListItem || isNextLineListItem) return line;

      if (line.trim() === "\\") return line.replace("\\", "&nbsp;\n");

      return line + "&nbsp;\n";
    })
    .join("\n");

  const renderer = new marked.Renderer();

  renderer.list = (body, ordered, start) => {
    return `<ul class='md_list'>${body}</ul>`;
  };
  renderer.blockquote = (quote) => {
    return `<blockquote class="md_blockquote">${quote}</blockquote>`;
  };
  renderer.image = (href, title, text) => {
    return `<img src="${href}" alt="${text}" style="width: 100%; object-fit: contain;" >`;
  };

  return marked.parse(parsedText, { breaks: true, renderer });
};
