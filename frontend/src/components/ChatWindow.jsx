import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AdaptiveCardRenderer from "./AdaptiveCardRenderer";

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/chat/message",
        { text: input }
      );
      setMessages((prev) => [...prev, response.data]);
      setError(null);
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to connect to backend. Is it running on port 5000?");
    }
  };

  const handleCardAction = (response) => {
    setMessages((prev) => [...prev, response]);
  };

  return (
    <div className="chat-window">
      {error && <div className="error">{error}</div>}
      <div className="messages">
        {messages.length === 0 && !error ? (
          <p style={{ textAlign: "center", color: "#888" }}>
            No messages yet. Start chatting!
          </p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text && <p>{msg.text}</p>}
              {msg.adaptiveCard && (
                <AdaptiveCardRenderer
                  card={msg.adaptiveCard}
                  onAction={handleCardAction}
                />
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
