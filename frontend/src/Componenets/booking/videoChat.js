import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "../../CSS/Experts/chat.css"; // Import the CSS file

const socket = io("http://localhost:5000");

const Chat = ({ userId, expertId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const room = `${userId}-${expertId}`;
    socket.emit("joinRoom", room);
    console.log(`User joined room: ${room}`);

    socket.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.emit("leaveRoom", room);
      socket.off("receiveMessage");
    };
  }, [userId, expertId]);

  const sendMessage = () => {
    if (message.trim()) {
      const room = `${userId}-${expertId}`;
      socket.emit("sendMessage", {
        message,
        room,
        from: userId,
      });
      setMessage("");
    }
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button className="chat-button" onClick={toggleChat}>
        {isOpen ? "×" : "💬"}
      </button>
      <div className={`chat-box ${isOpen ? "open" : ""}`}>
        <div className="chat-header">
          <h4>Chat With Expert</h4>
          <button onClick={toggleChat}>×</button>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className="chat-message">
              <strong>{msg.from}:</strong> {msg.message}
            </div>
          ))}
        </div>
        <div className="chat-input">
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

export default Chat;
