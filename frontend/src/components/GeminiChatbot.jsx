import React, { useState, useContext } from "react";
import { ShopContext } from '../context/ShopContext';
import ReactMarkdown from "react-markdown";

const GeminiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendUrl } = useContext(ShopContext);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true); 

    try {
      console.log('Изпращане на съобщение към сървъра:', input);

      const response = await fetch(`${backendUrl}/api/geminiChat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        console.error('Грешка в отговора от сървъра:', response);
        return;
      }

      const data = await response.json();
      const botMessage = { sender: "bot", text: data.reply };
      setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    } catch (error) {
      console.error('Грешка при изпращане на съобщението:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 p-4 bg-blue-600 text-white rounded-full shadow-lg"
      >
        Имате въпрос ?
      </button>

      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 bg-white shadow-lg rounded-lg p-4">
          <div className="h-64 overflow-y-scroll">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  {msg.sender === "bot" ? (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border rounded-l-lg"
              placeholder="Съобщение..."
            />
            <button
              onClick={sendMessage}
              className="px-0.1 bg-blue-500 text-white rounded-r-lg"
            >
              Изпрати
            </button>
          </div>

          {loading && (
            <div className="mt-2 text-center text-gray-500">
              <span className="dot dot1">.</span>
              <span className="dot dot2">.</span>
              <span className="dot dot3">.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GeminiChatbot;
