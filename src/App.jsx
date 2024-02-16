import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contacts from "./notesgroup/Contacts";
import Chat from "./notesgroup/Chat";
import WebApp from "./webapp"; // Import WebApp component for web
import MobileApp from "./MobileApp";
const App = () => {
  // Function to check if the device is mobile based on screen width
  const isMobile = () => {
    return window.innerWidth <= 768; // Adjust the threshold as needed
  };

  return (
    <Router>
      <Routes>
        {/* Route for mobile */}
        {isMobile() ? (
          <>
            {/* <Route exact path="/" element={<Contacts />} />
            <Route exact path="/chat/" element={<Chat />} /> */}
            <Route path="/" element={<MobileApp />} />
          </>
        ) : (
          // Route for web
          <Route exact path="/" element={<WebApp />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
