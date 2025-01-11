import React, { useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Send, UserPlus } from "lucide-react";

const Chat = () => {
  const username = "saurabhssonkar";
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
        query: { username },
      }),
    []
  );

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socketID, setSocketId] = useState(socket.id);

  // Bind socket listeners
  socket.on("connect", () => {
    setSocketId(socket.id);
    console.log("connected", socket.id);
  });

  socket.on("load-messages", (data) => {
    console.log("message:", data);
    setMessages(data);
  });

  socket.on("receive-message", (data) => {
    console.log("New message:", data);
    setMessages((prevMessages) => [...prevMessages, data]);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message });
    setMessage("");
  };

  const addFriendHandler = () => {
    socket.emit("add-friend");
    console.log("Friend added");
  };

  return (
    <div className="  w-full mx-auto px-5">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Socket ID: {socketID}</h3>
      </div>
      <div className="space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
          >
            <p className="text-sm text-gray-500">Room: {m.room}</p>
            <p className="my-2">
              <strong>{m.sender}</strong>: {m.message}
            </p>
            <p className="text-xs text-gray-400">
              {new Date(m.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 text-white bg-green-500 hover:bg-green-600 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <Send size={18} /> Send
        </button>
      </form>

      <div className="mt-6">
        <button
          onClick={addFriendHandler}
          className="w-full flex items-center justify-center gap-2 py-3 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <UserPlus size={18} /> Add Friend
        </button>
      </div>
    </div>
  );
};

export default Chat;
