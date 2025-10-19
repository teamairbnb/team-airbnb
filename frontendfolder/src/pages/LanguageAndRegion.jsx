import React, { useState } from "react";
import Header from "../components/Header.jsx";

function LanguageAndRegion() {
  const [activeTab, setActiveTab] = useState("language");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedRegion, setSelectedRegion] = useState("Nigeria");

  const languages = ["English", "Yoruba", "Hausa", "Igbo", "Spanish"];
  const regions = ["Nigeria", "Ghana", "Kenya", "South Africa", "United States"];

  const handleConfirm = () => {
    alert(`Saved!\nLanguage: ${selectedLanguage}\nRegion: ${selectedRegion}`);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
      <Header title="Profile/Language & Region" />

      {/* Tabs */}
      <div className="flex justify-center gap-6 mt-6">
        <button
          onClick={() => setActiveTab("language")}
          className={`px-6 py-2 rounded-full font-medium transition ${
            activeTab === "language"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-400 border border-blue-500 hover:bg-gray-100"
          }`}
        >
          Language
        </button>

        <button
          onClick={() => setActiveTab("region")}
          className={`px-6 py-2 rounded-full font-medium transition ${
            activeTab === "region"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-400 border border-blue-500 hover:bg-gray-100"
          }`}
        >
          Region
        </button>
      </div>

      {/* Options */}
      <div className="w-full max-w-md mt-10 px-6 flex-grow">
        {activeTab === "language" && (
          <div className="flex flex-col gap-4">
            {languages.map((lang) => (
              <div
                key={lang}
                className="flex justify-between items-center bg-white rounded-lg shadow-sm px-4 py-3"
              >
                <span className="text-gray-800">{lang}</span>
                <input
                  type="radio"
                  name="language"
                  checked={selectedLanguage === lang}
                  onChange={() => setSelectedLanguage(lang)}
                  className="w-5 h-5 accent-blue-500"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === "region" && (
          <div className="flex flex-col gap-4">
            {regions.map((region) => (
              <div
                key={region}
                className="flex justify-between items-center bg-white rounded-lg shadow-sm px-4 py-3"
              >
                <span className="text-gray-800">{region}</span>
                <input
                  type="radio"
                  name="region"
                  checked={selectedRegion === region}
                  onChange={() => setSelectedRegion(region)}
                  className="w-5 h-5 accent-blue-500"
                />
              </div>
            ))}
          </div>
        )}
      </div>


      <div className="w-full px-6 pb-10 flex justify-center">
        <button
          onClick={handleConfirm}
          className="bg-blue-500 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:bg-blue-600 transition w-full max-w-md"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default LanguageAndRegion;
