const languageIds = {
  python: 100,
  javascript: 102,
  c: 103,
  cpp: 105,
  java: 91,
};

async function executeCode(code, language, input = "") {
  const languageId = languageIds[language];

  if (!languageId) {
    throw new Error("Unsupported language");
  }

  const response = await fetch(
    "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin: input,

        cpu_time_limit: 2,
        wall_time_limit: 5,
        memory_limit: 128000,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Judge0 request failed: ${response.status}`
    );
  }

  const result = await response.json();

  if (result.compile_output) {
    return result.compile_output;
  }

  if (result.stderr) {
    return result.stderr;
  }

  if (result.stdout) {
    return result.stdout;
  }

  return result.message || "Program produced no output.";
}

module.exports = executeCode;