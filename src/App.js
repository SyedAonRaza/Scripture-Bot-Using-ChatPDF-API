import React, { useState } from 'react';
import axios from 'axios';
import ChatBox from './ChatBox';
import './App.css';
import { getApiKey, getSourceId } from './Credentials';

function App() {
  const [selectedSource, setSelectedSource] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleIconClick = (sourceId) => {
    setSelectedSource(sourceId);
  };

  const handleSendMessage = async (message) => {
    setMessages([...messages, { sender: 'user', text: message }]);

    try {
      let sourceId;
      switch (selectedSource) {
        case 1:
          sourceId = 1;
          break;
        case 2:
          sourceId = 2;
          break;
        case 3:
          sourceId = 3;
          break;
        default:
          console.error('Invalid selected source:', selectedSource);
          return;
      }

      const config = {
        headers: {
          "x-api-key": getApiKey(),
          "Content-Type": "application/json",
        },
      };

      const data = {
        sourceId: getSourceId(sourceId),
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      };

      const response = await axios.post("https://api.chatpdf.com/v1/chats/message", data, config);

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: response.data.content },
      ]);
    } catch (error) {
      console.error('Error:', error.message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: `Error: ${error.message}` },
      ]);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Scripture Bot</h1>
      </header>
      <div className="content">
        <div className="icons">
          <div
            className={`icon ${selectedSource === 1 ? 'selected' : ''}`}
            onClick={() => handleIconClick(1)}
          >
            <img src="quran.jpg" alt="Quran" />
            <p>Quran</p>
          </div>
          <div
            className={`icon ${selectedSource === 2 ? 'selected' : ''}`}
            onClick={() => handleIconClick(2)}
          >
            <img src="old.jpg" alt="Old Testament" />
            <p>Old Testament</p>
          </div>
          <div
            className={`icon ${selectedSource === 3 ? 'selected' : ''}`}
            onClick={() => handleIconClick(3)}
          >
            <img src="new.jpg" alt="New Testament" />
            <p>New Testament</p>
          </div>
        </div>
        {selectedSource && <ChatBox onSendMessage={handleSendMessage} messages={messages} />}
      </div>
      <footer className="app-footer">
        <p>Alpha Version 2024 - Developed by Syed Aon Raza at HPC Lab NUST-SEECS</p>
      </footer>
    </div>
  );
}

export default App;