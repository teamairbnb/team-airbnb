import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import chaticon from "../assets/blackchaticon.svg";
import sendimg from "../assets/sendimg.svg";

const socket = io("http://localhost:4000");

export default function LiveChat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { backTo = "/", role = "guest" } = location.state || {};

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, { sender: "other", text: message }]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const handleSend = () => {
    if (inputValue.trim() === "") return;

    const message = inputValue.trim();

    // Add locally
    setMessages((prev) => [...prev, { sender: "user", text: message }]);

    // Send to other
    socket.emit("sendMessage", message);

    setInputValue("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

      {/* Chat Messages */}
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
