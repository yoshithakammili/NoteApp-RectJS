import React, { useState, useEffect } from "react";
import Contacts from "./notesgroup/Contacts";
import Chat from "./notesgroup/Chat";
import "./mobileApp.css";


const MobileApp = () => {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };
  const handleBackToContacts = () => {
    setSelectedContact(null);
  };

  return (
    <div className="mobile-app-container">
      {!selectedContact ? (
        <Contacts onSelectContact={handleContactSelect} />
        ) : (
          <Chat
            contact={selectedContact}
            onBackToContacts={handleBackToContacts}
          />
        )}
    </div>
  );
};

export default MobileApp;
