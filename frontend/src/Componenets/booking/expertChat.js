import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "../../CSS/Experts/expertChat.css"; // Import the CSS file

const socket = io("http://localhost:5000");

const ExpertChat = ({ expertId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(""); // State to capture userId input
  const [isOpen, setIsOpen] = useState(false); // State for toggling chat box

  useEffect(() => {
    if (userId) {
      const room = `${userId}-${expertId}`;
      socket.emit("joinRoom", room);
      console.log(`Expert joined room: ${room}`);

      socket.on("receiveMessage", (data) => {
        console.log(data);
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      return () => {
        socket.emit("leaveRoom", room);
        socket.off("receiveMessage");
      };
    }
  }, [userId, expertId]);

  const sendMessage = () => {
    if (message.trim()) {
      const room = `${userId}-${expertId}`;
      socket.emit("sendMessage", {
        message,
        room,
        from: expertId,
      });
      setMessage("");
    }
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button className="expert-chat-button" onClick={toggleChat}>
        {isOpen ? "×" : "💬"}
      </button>
      <div className={`expert-chat-box ${isOpen ? "open" : ""}`}>
        <div className="expert-chat-header">
          <h4>Chat with User</h4>
          <button onClick={toggleChat}>×</button>
        </div>
        <div className="expert-chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className="expert-chat-message">
              <strong>{msg.from}:</strong> {msg.message}
            </div>
          ))}
        </div>
        <div className="expert-chat-input">
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
          />
        </div>
        <div className="expert-chat-input">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
};

export default ExpertChat;
