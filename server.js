const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post("/run", (req, res) => {
  const { code, language } = req.body;

  // Set file extension based on language
  const fileExtension = {
    python: "py",
    cpp: "cpp",
    java: "java",
  }[language];

  const fileName = `code.${fileExtension}`;
  fs.writeFileSync(fileName, code);

  let command;

  // Define command based on language
  switch (language) {
    case "python":
      command = `python3 ${fileName}`;
      break;
    case "cpp":
      command = `g++ ${fileName} -o code.out && ./code.out`;
      break;
    case "java":
      command = `javac ${fileName} && java ${fileName.replace(".java", "")}`;
      break;
    default:
      return res.status(400).send("Unsupported language");
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      res.send({ output: stderr });
    } else {
      res.send({ output: stdout });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
