const terminal = document.getElementById("terminal-output");

const introLines = [
  "Welcome to Kirill's Dev Terminal...",
  "Initializing fullstack modules...",
  "Connected: React, Angular, Python, Security...",
  "Type -help for commands."
];

let lineIndex = 0;
let charIndex = 0;

function typeIntro() {
  if (lineIndex < introLines.length) {
    let line = document.getElementById(`intro-line-${lineIndex}`);

    // если элемент строки ещё не создан — создаём
    if (!line) {
      line = document.createElement("div");
      line.className = "line";
      line.id = `intro-line-${lineIndex}`;
      terminal.appendChild(line);
    }

    const currentText = introLines[lineIndex];
    if (charIndex < currentText.length) {
      line.textContent += currentText[charIndex];
      charIndex++;
      setTimeout(typeIntro, 45);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeIntro, 300);
    }
  } else {
    showInputLine();
  }
}


function showInputLine() {
  const line = document.createElement("div");
  line.className = "input-line";

  const prompt = document.createElement("span");
  prompt.className = "prompt";
  prompt.textContent = "$";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "user-input";
  input.autofocus = true;

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const value = input.value;
      input.disabled = true;
      line.remove();

      const commandLine = document.createElement("div");
      commandLine.textContent = `$ ${value}`;
      terminal.appendChild(commandLine);

      processCommand(value);
    }
  });

  line.appendChild(prompt);
  line.appendChild(input);
  terminal.appendChild(line);
  scrollToBottom();
  input.focus();
  terminal.scrollTop = terminal.scrollHeight;
}

function processCommand(command) {
  const cmd = command.trim().toLowerCase();
  const output = document.createElement("div");

  switch (cmd) {
    case "-help":
      output.innerHTML = "Available commands:<br>info - краткая сводка<br>clear - очистить<br>github - ссылка на GitHub";
      break;
    case "info":
      output.textContent = "Кирилл Митичкин — fullstack-разработчик, студент ИТМО.";
      break;
    case "clear":
      terminal.innerHTML = "";
      showInputLine();
      return;
    case "github":
      output.innerHTML = '<a href="https://github.com/KirillWebHub" target="_blank">https://github.com/KirillWebHub</a>';
      break;
    default:
      output.textContent = `'${cmd}' не является известной командой. Введите -help.`;
  }

  terminal.appendChild(output);
  scrollToBottom();
  showInputLine();
}
window.onload = typeIntro;


function scrollToBottom() {
  terminal.scrollTop = terminal.scrollHeight;
}







