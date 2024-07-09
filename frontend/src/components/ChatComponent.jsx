import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

function ChatComponent({ vehicleId, ownerId, userId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const room = `${vehicleId}-${ownerId}-${userId}`;
    socket.emit("join", room);

    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [vehicleId, ownerId, userId]);

  const sendMessage = (e) => {
    e.preventDefault();
    const room = `${vehicleId}-${ownerId}-${userId}`;
    if (message) {
      socket.emit("message", { room, message });
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="chat-form">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button type="submit" className="chat-button">Send</button>
      </form>
    </div>
  );
}

export default ChatComponent;
