import React, { useState, useEffect } from "react";
import "./Dialog.css";

const Dialog = ({ title, onSave, onClose }) => {
  const colors = [
    "#FF5733",
    "#FFC300",
    "#36A2EB",
    "#4BC0C0",
    "#9966FF",
    "#864BEB",
  ]; // Sample colors

  const [noteName, setNoteName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    // Check screen width and set dialog width accordingly
    const screenWidth = window.innerWidth;
    const dialogWidth = screenWidth > 768 ? "400px" : "90%"; // Adjust breakpoint and width as needed
    document.documentElement.style.setProperty("--dialog-width", dialogWidth);
  }, []);
  const handleColorClick = (color) => {
    // Optionally handle color selection
    setSelectedColor(color);
  };

  const handleSave = () => {
    // Save content to local storage and close the dialog
    if (!noteName || !selectedColor) {
      setToastMessage("Please select both note name and color.");
      setTimeout(() => {
        setToastMessage("");
      }, 3000); // Hide toast message after 3 seconds
      return;
    }

    onSave(noteName, selectedColor);
    onClose();
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2 className="dialog-title">{title}</h2>

        <div className="float-container">
          <p className="p-group-name">Group Name</p>
          <input
            type="text"
            value={noteName}
            onChange={(e) => setNoteName(e.target.value)}
            className="dialog-input"
            placeholder="Enter text..."
          />
        </div>
        <div className="float-container">
          <p className="p-group-name">Select Color</p>
          <div className="color-list">
            {colors.map((color, index) => (
              <div
                key={index}
                className="color-item"
                style={{ backgroundColor: color }}
                onClick={() => handleColorClick(color)}
              >
                {selectedColor === color && ( // Conditional rendering for tick icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-check"
                    style={{
                      width: "20px",
                      height: "20px",
                      marginTop: "5px",
                      // Align horizontally at 50% from the left
                    }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
        <button className="dialog-button" onClick={handleSave}>
          Create
        </button>
        {toastMessage && <div className="toast">{toastMessage}</div>}
      </div>
    </div>
  );
};

export default Dialog;
