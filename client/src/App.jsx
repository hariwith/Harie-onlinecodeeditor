import { useState } from "react";
import * as prettier from "prettier/standalone";
import * as babelPlugin from "prettier/plugins/babel";
import * as estreePlugin from "prettier/plugins/estree";
import Editor from "@monaco-editor/react";

import "./index.css";
import "./App.css";

const languages = {
  python: {
    label: "Python",
    boilerplate: 'print("Hello harie")',
  },

  javascript: {
    label: "JavaScript",
    boilerplate: 'console.log("Hello harie");',
  },

  c: {
    label: "C",
    boilerplate: `#include <stdio.h>

int main() {
    printf("Hello harie");
    return 0;
}`,
  },

  cpp: {
    label: "C++",
    boilerplate: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello harie";
    return 0;
}`,
  },

  java: {
    label: "Java",
    boilerplate: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello harie");
    }
}`,
  },
};

function App() {
  const [language, setLanguage] = useState("python");

  const [code, setCode] = useState(
    languages.python.boilerplate
  );

  const [input, setInput] = useState("");

  const [output, setOutput] = useState("");

  const [isRunning, setIsRunning] = useState(false);

  const formatCode = async () => {
    try {
      if (language === "javascript") {
        const formattedCode = await prettier.format(code, {
          parser: "babel",
          plugins: [babelPlugin, estreePlugin],
        });

        setCode(formattedCode);
      } else {
        setOutput(
          "Pretty Format is currently available for JavaScript."
        );
      }
    } catch (error) {
      console.error("Formatting error:", error);

      setOutput("Could not format the code.");
    }
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;

    setLanguage(selectedLanguage);

    setCode(
      languages[selectedLanguage].boilerplate
    );

    setInput("");

    setOutput("");
  };

  const runCode = async () => {
    if (isRunning) {
      return;
    }

    setIsRunning(true);

    setOutput("Running...");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/execute`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            code: code,
            language: language,
            input: input,
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        setOutput(data.error);
        return;
      }

      setOutput(data.output);
    } catch (error) {
      console.error(
        "Execution request error:",
        error
      );

      setOutput(
        "Could not connect to the server."
      );
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="app">

      <div className="toolbar">

        <label htmlFor="language">
          Language:
        </label>

        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="python">
            Python
          </option>

          <option value="javascript">
            JavaScript
          </option>

          <option value="c">
            C
          </option>

          <option value="cpp">
            C++
          </option>

          <option value="java">
            Java
          </option>
        </select>

        <button
          type="button"
          onClick={formatCode}
        >
          Pretty Format
        </button>

        <button
          type="button"
          onClick={runCode}
          disabled={isRunning}
        >
          {isRunning ? "Running..." : "▶"}
        </button>

      </div>

      <div className="editor-output">

        <div className="editor-section">

          <Editor
            height="100%"
            theme="vs-dark"
            language={language}
            value={code}
            onChange={(value) =>
              setCode(value || "")
            }
          />

        </div>

        <div className="output-section">

          <h2>Input</h2>

          <textarea
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            placeholder="Enter program input..."
          />

          <h2>Output</h2>

          <pre>{output}</pre>

        </div>

      </div>

    </div>
  );
}

export default App;