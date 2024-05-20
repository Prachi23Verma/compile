const express = require("express");
const app = express();
const bodyP = require("body-parser");
const compiler = require("compilex");
const option = { stats: true };
compiler.init(option);
app.use(bodyP.json());
app.use(
  "/codemirror-5.65.16", express.static("C:/Users/Lenovo/Desktop/compile/codemirror-5.65.16")
);
app.get("/", function (req, res) {
    res.sendFile("C:/Users/Lenovo/Desktop/compile/index.html");
});
app.post("/compile", function (req, res) {
  var code = req.body.code;
  var input = req.body.input;
  var lang = req.body.lang;
  try {
    if (lang == "Cpp") {
      if (!input) {
        //if windows
        var envData = { OS: "windows", cmd: "g++", options:{timeout:10000} };
        compiler.compileCPP(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "Error..." });
          }
        });
      } else {
        var envData = { OS: "windows", cmd: "g++", options:{timeout:10000} };
        compiler.compileCPPWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "Error..." });
          }
        });
      }
    } else if (lang == "Java") {
      if (!input) {
        var envData = { OS: "windows" };
        compiler.compileJava(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "Error..." });
          }
        });
      } else {
        var envData = { OS: "windows" };
        compiler.compileJavaWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "Error..." });
          }
        });
      }
    } else if (lang == "Python") {
      if (!input) {
        var envData = { OS: "windows" };
        compiler.compilePython(envData, code, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "Error..." });
          }
        });
      } else {
        var envData = { OS: "windows" };
        compiler.compilePythonWithInput(envData, code, input, function (data) {
          if (data.output) {
            res.send(data);
          } else {
            res.send({ output: "Error..." });
          }
        });
      }
    }
  } catch (e) {
    console.log("error");
  }
});
app.post("/compile", function (req, res) {
  var code = req.body.code;
  function analyzeComplexity(code) {
    // Remove comments from the code
    code = code.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '');

    // Initialize variables to track time and space complexity
    let timeComplexity = 'O(1)'; 
    let spaceComplexity = 'O(1)'; 

    // Check for loop structures
    if (code.match(/for\s*\(.*\)|while\s*\(.*\)|do\s*{.*}\s*while\s*\(.*\)/)) {
        timeComplexity = 'O(n)'; 
    }

    // Check for recursive calls
    if (code.match(/function\s+\w+\s*\(/)) {
        timeComplexity = 'O(2^n)'; 
    }

   
    if (code.match(/\[\]|\{\}/)) {
        spaceComplexity = 'O(n)'; 
    }

    // Output the calculated complexities
    res.alert('Time Complexity:', timeComplexity);
   res.alert('Space Complexity:', spaceComplexity);
}

analyzeComplexity(codeSnippet);

});
app.listen(5502);
