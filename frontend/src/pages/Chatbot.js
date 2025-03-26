import React, { useState } from "react";
import { Send } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you with donations today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    // Simulating bot response
    setTimeout(() => {
      const botResponse = {
        sender: "bot",
        text: "Thank you for your message! Our team will guide you shortly.",
      };
      setMessages([...messages, userMessage, botResponse]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">Chatbot Assistant</h1>
        <p className="text-gray-600 text-center">Ask anything about donations, our process, or how you can help!</p>

        {/* Chat Box */}
        <div className="mt-4 h-64 overflow-y-auto border rounded-lg p-4 bg-gray-100">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-2`}
            >
              <div
                className={`px-4 py-2 rounded-lg ${
                  msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="flex mt-4">
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="ml-2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            onClick={handleSendMessage}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
