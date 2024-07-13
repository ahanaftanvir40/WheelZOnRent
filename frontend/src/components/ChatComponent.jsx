import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

function ChatComponent({ vehicleId, userId, ownerId, username }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const room = `${vehicleId}-${ownerId}-${userId}`;
    socket.emit("join", { vehicleId, ownerId, userId });

    // Fetch previous messages
    axios.get(`http://localhost:3000/api/chat/${vehicleId}/${ownerId}/${userId}`)
      .then(response => {
        setMessages(response.data);
      });

    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("message");
    };
  }, [vehicleId, userId, ownerId]);

  const sendMessage = (e) => {
    e.preventDefault();
    const room = `${vehicleId}-${ownerId}-${userId}`;
    if (message) {
      socket.emit("message", { vehicleId, ownerId, userId, message, senderId: userId  , username});
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h1>Chat with Owner {ownerId}</h1>
      <div className="chat-messages w-fit h-fit">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            {msg.message}
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
