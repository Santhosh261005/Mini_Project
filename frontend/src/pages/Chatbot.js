import React, { useState } from "react";
import { Send } from "lucide-react";
import Navbar from "../components/Navbar";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you with donations today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    try {
      const response = await fetch("http://127.0.0.1:5000/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();
      const botMessage = {
        sender: "bot",
        text: data.response || "I'm not sure how to answer that.",
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Error fetching response. Please try again." },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-cyan-300 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4">
          <h1 className="text-2xl font-bold text-white text-center">Chatbot Assistant</h1>
        </div>

        <div className="p-6">
          <p className="text-gray-600 text-center mb-4">
            Ask anything about donations, our process, or how you can help!
          </p>

          {/* Chat Box */}
          <div className="h-64 overflow-y-auto border rounded-lg p-4 bg-gray-100 mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-2`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs ${
                    msg.sender === "user" 
                      ? "bg-blue-500 text-white" 
                      : "bg-gray-300 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex">
            <input
              type="text"
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition duration-200"
              onClick={handleSendMessage}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
