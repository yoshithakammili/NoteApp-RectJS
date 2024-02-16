// WebApp.js
import React, { useState, useEffect } from "react";
import Contacts from "./notesgroup/Contacts";
import Chat from "./notesgroup/Chat";
import "./Webapp.css"; // Import CSS file for styling

const WebApp = () => {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactSelect = (contact) => {
    console.log("selected contact =" + contact);

    setSelectedContact(contact);
  };

  return (
    <div className="web-app-container">
      <div className="contacts-container">
        <Contacts onSelectContact={handleContactSelect} />
      </div>
      <div className="chat-container">
        <Chat contact={selectedContact} />
      </div>
    </div>
  );
};

export default WebApp;
