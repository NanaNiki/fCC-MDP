// Import necessary React and ReactDOM hooks and libraries
const { useState, useEffect, useRef } = React;
const { render } = ReactDOM;
const { marked } = marked;

//Set options for marked library
marked.setOptions({
  breaks: true,
});

/**
 * Component that renders an input textarea element for editing
 * @param {string} input - The input string to display in the textarea
 * @param {function} update - The function to call when the textarea is updated
 * @param {string} style - The background color to apply to the textarea
 */
function Editorin({ input, update, style }) {
  return (
    <textarea
      id="editor"
      value={input}
      onChange={update}
      style={{ backgroundColor: style }}
    ></textarea>
  );
}

/**
 * Component that renders a preview div element for the markdown output
 * @param {string} input - The input string to display in the preview
 */
function Previewout({ input }) {
  const ref = useRef(null);
  // Effect hook that renders the markdown output in the preview div whenever the input changes
  useEffect(() => {
    ref.current.innerHTML = marked(input);
  }, [input]);

  return <div className="ms-3 mt-3 me-3 preview" ref={ref} id="preview"></div>;
}

// `const example` is a string variable that contains a sample markdown text.
const example =
  "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)\n";

// Main appplication component, that sets up the state and behavior for the Markdown Previewer app.
function App() {
  // State input which initializes with example markdown text.
  const [input, setInput] = React.useState(example);
  // Function that sets the input state to the value of the input field
  const inputChange = (e) => {
    setInput(e.target.value);
  };

  // DarkMode state initialized as false and toggleDarkMode function which toggles the darkMode state when called
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  /**
   * React component that renders an editor and a previewer for markdown code.
   * The app has two parts: an editor on the left side and a previewer on the right side.
   * The editor allows users to input Markdown syntax, which is then previewed in real-time on the previewer.
   * The component also includes a footer with a link to the developer's profile page on freeCodeCamp website.
   * @param {string} input - The input markdown code to be edited and previewed.
   * @param {function} inputChange - The function to be called when the input markdown code is changed.
   * @param {boolean} darkMode - The flag indicating whether to use dark mode or not.
   * @param {function} toggleDarkMode - The function to be called when the dark mode is toggled.
   * @returns {JSX.Element} - The HTML code for the React component that renders the editor and the previewer.
   */
  return (
    <>
      <div className="app container-fluid row p-4">
        <div className="col-sm m-3">
          <div className="card border-4 border-info">
            <div
              className={`card-header bg-${
                darkMode ? "dark" : "info-subtle"
              } ps-4`}
            >
              <h5
                className={`text-${
                  darkMode ? "secondary" : "info-emphasis"
                } fw-bold mt-2`}
              >
                Editor
                <button
                  className="btn btn-sm float-end max"
                  onClick={toggleDarkMode}
                >
                  {darkMode ? (
                    <i className="fa-solid fa-sun"></i>
                  ) : (
                    <i className="fa-solid fa-moon"></i>
                  )}
                </button>
              </h5>
            </div>
            <Editorin
              input={input}
              update={inputChange}
              style={darkMode ? "grey" : "white"}
            />
          </div>
        </div>
        <div className="col-md m-3">
          <div
            className={`card border-4 border-info bg-${
              darkMode ? "dark" : "white"
            }  ${darkMode ? "text-white" : ""}`}
          >
            <div
              className={`card-header bg-${
                darkMode ? "dark" : "info-subtle"
              } fw-bold ps-4`}
            >
              <h5
                className={`text-${
                  darkMode ? "secondary" : "info-emphasis"
                } fw-bold mt-2`}
              >
                Previewer
                <button
                  className="btn btn-sm float-end max"
                  onClick={toggleDarkMode}
                >
                  {darkMode ? (
                    <i className="fa-solid fa-sun"></i>
                  ) : (
                    <i className="fa-solid fa-moon"></i>
                  )}
                </button>
              </h5>
            </div>
            <Previewout input={input} />
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Renders the App component to the DOM.
 * @function
 * @name render
 * @param {ReactElement} App - The root component of the application.
 * @param {HTMLElement} root - The DOM element to which the App component should be rendered.
 */
ReactDOM.render(<App />, document.getElementById("root"));
