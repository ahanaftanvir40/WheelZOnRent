import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

function OwnerChatComponent({ vehicleId, ownerId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userIds, setUserIds] = useState([]);

  useEffect(() => {
    // Fetch unique user IDs that the owner has chatted with
    axios.get(`http://localhost:3000/api/ownerChats/${vehicleId}/${ownerId}`)
      .then(response => {
        setUserIds(response.data.userIds);
      });

    // Join the owner's room
    socket.emit("join", { vehicleId, ownerId });

    // Listen for new user notifications
    socket.on('newUser', ({ userId }) => {
      setUserIds((prevUserIds) => [...prevUserIds, userId]);
    });

    return () => {
      socket.off('newUser');
    };
  }, [vehicleId, ownerId , userIds]);

  useEffect(() => {
    if (currentUserId) {
      const room = `${vehicleId}-${ownerId}-${currentUserId}`;
      socket.emit("join", { vehicleId, ownerId, userId: currentUserId });

      axios.get(`http://localhost:3000/api/chat/${vehicleId}/${ownerId}/${currentUserId}`)
        .then(response => {
          setMessages(response.data);
        });

      socket.on("message", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.off("message");
      };
    }
  }, [vehicleId, ownerId, currentUserId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message && currentUserId) {
      socket.emit("message", { vehicleId, ownerId, userId: currentUserId, message, senderId: ownerId });
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h1>Owner Chat</h1>
      <div className="user-list">
        {userIds.map((userId, index) => (
          <button key={index} onClick={() => setCurrentUserId(userId)}>
            Chat with User {userId}
          </button>
        ))}
      </div>
      {currentUserId && (
        <div>
          <h2>Chatting with User {currentUserId}</h2>
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
      )}
    </div>
  );
}

export default OwnerChatComponent;
