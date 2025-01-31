import React, { useState, useContext } from "react";
import { ShopContext } from '../context/ShopContext';
import ReactMarkdown from "react-markdown";
import { Send, MessageSquare } from "lucide-react";

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
      console.log("Изпращане на съобщение към сървъра:", input);

      const response = await fetch(`${backendUrl}/api/geminiChat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        console.error("Грешка в отговора от сървъра:", response);
        return;
      }

      const data = await response.json();
      const botMessage = { sender: "bot", text: data.reply };
      setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    } catch (error) {
      console.error("Грешка при изпращане на съобщението:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 p-4 bg-black text-white rounded-full shadow-lg flex items-center gap-2 hover:bg-gray-800 transition"
      >
        <MessageSquare size={20} /> Имате въпрос?
      </button>

      {isOpen && (
        <div className="fixed bottom-16 right-4 w-80 bg-white shadow-2xl rounded-xl p-4 border border-gray-300">
          <div className="h-64 overflow-y-scroll p-2 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`px-3 py-2 max-w-[80%] rounded-lg text-sm ${
                    msg.sender === "user" ? "bg-black text-white" : "bg-gray-200"
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

          <div className="mt-4 flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 outline-none text-sm"
              placeholder="Напишете съобщение..."
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition"
            >
              <Send size={18} />
            </button>
          </div>

          {loading && (
            <div className="mt-2 text-center text-gray-500 animate-pulse">...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GeminiChatbot;
