import React, { useRef, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import Header from "../components/Header.jsx";

function UploadImage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

 
  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col justify-center  bg-gray-50">
   
      <Header title="Profile/Verification" />

      {/* Upload Box */}
      <div className="flex flex-col items-center justify-center mt-10 w-full px-4">
        <p className="mb-7 text-gray-400">Upload your business CAC image</p>
        <div
          onClick={handleBoxClick}
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 bg-white rounded-2xl w-full max-w-[350px] h-[220px] shadow-sm hover:shadow-md transition cursor-pointer"
        >
          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Show preview if image is selected */}
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Uploaded Preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-600">
              <Upload className="w-7 h-7" />
              <span className="text-base font-medium">Upload Image Here</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadImage;
