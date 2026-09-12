const { spawn } = require("child_process");
const fs = require("fs/promises");
const os = require("os");
const path = require("path");

const allowedLanguages = {
  python: {
    image: "python:3.12-slim",
    sourceFile: "main.py",
    command: ["python", "/workspace/main.py"],
  },

  javascript: {
    image: "node:22-alpine",
    sourceFile: "main.js",
    command: ["node", "/workspace/main.js"],
  },

  c: {
    image: "gcc:14",
    sourceFile: "main.c",
    command: [
      "sh",
      "-c",
      "gcc /workspace/main.c -o /workspace/main && /workspace/main",
    ],
  },

  cpp: {
    image: "gcc:14",
    sourceFile: "main.cpp",
    command: [
      "sh",
      "-c",
      "g++ /workspace/main.cpp -o /workspace/main && /workspace/main",
    ],
  },

  java: {
    image: "eclipse-temurin:21-jdk",
    sourceFile: "Main.java",
    command: [
      "sh",
      "-c",
      "javac /workspace/Main.java && java -cp /workspace Main",
    ],
  },
};

function executeCode(code, language, input = "") {
  return new Promise(async (resolve, reject) => {
    if (!allowedLanguages[language]) {
      return reject(new Error("Unsupported language"));
    }

    const languageConfig = allowedLanguages[language];

    let tempDirectory;

    try {
      tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), "code-editor-"));

      const sourcePath = path.join(tempDirectory, languageConfig.sourceFile);

      await fs.writeFile(sourcePath, code, "utf8");
    } catch (error) {
      return reject(error);
    }

    const dockerArguments = [
      "run",
      "--rm",

      "-i",

      "--network",
      "none",

      "--memory",
      "128m",

      "--cpus",
      "0.5",

      "--pids-limit",
      "50",

      "--read-only",

      "--cap-drop",
      "ALL",

      "--security-opt",
      "no-new-privileges",

      "--tmpfs",
      "/tmp:rw,noexec,nosuid,size=64m",

      "-v",
      `${tempDirectory}:/workspace:rw`,

      languageConfig.image,

      ...languageConfig.command,
    ];

    const process = spawn("docker", dockerArguments, {
      shell: false,
    });

    process.stdin.write(input);
    process.stdin.end();

    let output = "";
    let errorOutput = "";

    const MAX_OUTPUT = 1024 * 1024;

    process.stdout.on("data", (data) => {
      output += data.toString();

      if (output.length > MAX_OUTPUT) {
        process.kill();

        reject(new Error("Output limit exceeded"));
      }
    });

    process.stderr.on("data", (data) => {
      errorOutput += data.toString();

      if (errorOutput.length > MAX_OUTPUT) {
        process.kill();

        reject(new Error("Error output limit exceeded"));
      }
    });

    const timeout = setTimeout(() => {
      process.kill();

      reject(new Error("Execution timed out"));
    }, 10000);

    process.on("close", async (exitCode) => {
      clearTimeout(timeout);

      try {
        await fs.rm(tempDirectory, {
          recursive: true,
          force: true,
        });
      } catch (cleanupError) {
        console.error("Cleanup error:", cleanupError);
      }

      if (exitCode === 0) {
        resolve(output);
      } else {
        resolve(errorOutput || "Program exited with an error");
      }
    });

    process.on("error", async (error) => {
      clearTimeout(timeout);

      try {
        await fs.rm(tempDirectory, {
          recursive: true,
          force: true,
        });
      } catch {}

      reject(error);
    });
  });
}

module.exports = executeCode;
