import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import chaticon from "../assets/blackchaticon.svg";
import sendimg from "../assets/sendimg.svg";

export default function LiveChat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { backTo = "/", role = "guest" } = location.state || {};

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInputValue("");

    try {
      const token = localStorage.getItem("accessToken"); 

      const response = await fetch(
        "https://team-airbnb.onrender.com/api/v1/chatbot/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: userMessage }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to get chatbot response");
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply || data.response || JSON.stringify(data),
        },
      ]);
    } catch (err) {
      console.error("Chatbot API error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I couldn’t process your request." },
      ]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="px-4 text-[#111827] min-h-screen pb-[100px] relative tracking-wide flex flex-col">
      <button
        onClick={() => navigate(backTo)}
        className="w-10 h-10 my-6 bg-gray-100 rounded-lg flex items-center justify-center"
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>

      <div className="flex justify-center mb-6">
        <div className="bg-white flex justify-center w-[95px] py-1 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.15)]">
          <img className="w-8" src={chaticon} alt="Chat Icon" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            } mb-3`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm ${
                msg.sender === "user"
                  ? "bg-[#2563EB] text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start mb-3">
            <div className="px-4 py-2 bg-gray-200 text-gray-600 rounded-2xl text-sm rounded-bl-none animate-pulse">
              Typing...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="fixed bottom-0 left-0 w-full px-4 pb-4 bg-white">
        <div className="relative w-full">
          <input
            type="text"
            placeholder={`Send a message as ${role}...`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="bg-[#F1F1F1] border w-full rounded-full py-[15px] pl-[20px] pr-[60px] focus:outline-none"
          />

          <div
            onClick={handleSend}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#2563EB] w-12 h-12 flex items-center justify-center rounded-full shadow-[0_0_15px_rgba(0,0,0,0.15)] cursor-pointer"
          >
            <img src={sendimg} className="w-5 ml-1" alt="send" />
          </div>
        </div>
      </div>
    </div>
  );
}
