function hidePlaceholders() {
  document.getElementById("placeholderCards").style.display = "none";
  document.querySelector(".help-text").style.display = "none"; // Hide the help text
}
function sendPlaceholder(placeholderText) {
  displayMessage(placeholderText, "user");
  sendMessageToAPI(placeholderText);
  hidePlaceholders(); // Hide the placeholders when a placeholder card is clicked
}
document.getElementById("sendBtn").addEventListener("click", function () {
  const userInput = document.getElementById("userInput");
  const message = userInput.value.trim();
  if (message) {
    displayMessage(message, "user");
    sendMessageToAPI(message);
    userInput.value = ""; // Clear input after sending
    hidePlaceholders();
  }
});

function displayMessage(message, sender) {
  const chatContainer = document.getElementById("chatContainer");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender, "p-2", "text-white", "rounded");

  // Check for code blocks denoted by ```
  if (message.includes("```")) {
    const codeContent = message.split("```")[1];
    message = message.replace(/```[\s\S]+```/, `<pre >${codeContent}</pre>`);
  }

  // Convert line breaks to <br>, and `-` or `*` lists to HTML lists
  message = message
    .replace(/\n/g, "<br>") // Newlines to <br>
    .replace(/(?:^|\n)(\*|\-)(.*?)(?=\n|$)/g, "<li>$2</li>"); // `-` or `*` to list items

  // If any list items were found, wrap them in `<ul>`
  if (/<li>/.test(message)) {
    message = `<ul>${message}</ul>`;
  }
  //if something is isnide "" "" than treat it as bold
  message = message.replace(/"(.*?)"/g, "<b>$1</b>");

  messageDiv.innerHTML = sender === "user" ? `You: ${message}` : `${message}`;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to the latest message
}

async function sendMessageToAPI(message) {
  displayTypingIndicator(); // Display the typing indicator

  try {
    const response = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    removeTypingIndicator(); // Remove the typing indicator
    const data = await response.json();
    if (data.message) {
      displayMessage(data.message, "bot");
    } else {
      displayMessage("Sorry, I could not understand that.", "bot");
    }
  } catch (error) {
    removeTypingIndicator(); // Remove the typing indicator in case of error
    console.error("Error:", error);
    displayMessage("Failed to get a response from the server.", "bot");
  }
}

function displayTypingIndicator() {
  const chatContainer = document.getElementById("chatContainer");
  const typingIndicator = document.createElement("div");
  typingIndicator.classList.add("typing-indicator");
  typingIndicator.id = "typingIndicator";
  typingIndicator.textContent = "Generating response...";
  chatContainer.appendChild(typingIndicator);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function removeTypingIndicator() {
  const typingIndicator = document.getElementById("typingIndicator");
  if (typingIndicator) {
    typingIndicator.remove();
  }
}
