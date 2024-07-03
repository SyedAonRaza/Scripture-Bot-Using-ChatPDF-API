import React, { useState } from "react";
import "./ChatBox.css";

const synth = window.speechSynthesis;

function ChatBox({ onSendMessage, messages }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSend = () => {
    if (query.trim()) {
      onSendMessage(query);
      setQuery("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Determine which source was selected
      // Example: If Quran is selected, send 1; If Old Testament is selected, send 2; If New Testament is selected, send 3
      const choice = document
        .querySelector(".selected")
        ?.getAttribute("choice");
      onSendMessage(query);
      setQuery("");
    }
  };

  const playTTS = (text) => {
    if (text) {
      // Cancel any ongoing speech
      synth.cancel();

      // Break text into smaller chunks if needed
      const maxChunkLength = 200; // Adjust as needed
      const chunks = [];

      let startIndex = 0;
      while (startIndex < text.length) {
        let endIndex = Math.min(startIndex + maxChunkLength, text.length);

        // Ensure we don't split words
        if (endIndex < text.length && text[endIndex] !== " ") {
          let lastSpaceIndex = text.lastIndexOf(" ", endIndex);
          if (lastSpaceIndex > startIndex) {
            endIndex = lastSpaceIndex;
          }
        }

        chunks.push(text.slice(startIndex, endIndex));
        startIndex = endIndex + 1;
      }

      // Create and speak each chunk
      const speakChunk = (chunk) => {
        return new Promise((resolve) => {
          const utterThis = new SpeechSynthesisUtterance(chunk);
          utterThis.addEventListener("end", () => {
            resolve();
          });
          utterThis.addEventListener("error", (error) => {
            console.error("Speech synthesis error:", error);
            resolve(); // Resolve to move to the next chunk even on error
          });
          synth.speak(utterThis);
        });
      };

      // Speak chunks sequentially
      const speakChunksSequentially = async (chunks) => {
        for (const chunk of chunks) {
          await speakChunk(chunk);
        }
      };

      // Start speaking chunks
      speakChunksSequentially(chunks)
        .then(() => {
          console.log("Finished speaking");
        })
        .catch((error) => {
          console.error("Error speaking chunks:", error);
        });
    } else {
      console.log("Error Loading TTS");
    }
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <span>{msg.text}</span>
            {msg.sender === "bot" && (
              <button
                onClick={() => {
                  playTTS(msg.text);
                }}
                className="tts-button"
              >
                <img src="audio.png" alt="Play TTS" />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
