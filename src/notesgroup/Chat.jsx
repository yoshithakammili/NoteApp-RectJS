import React, { useState, useEffect } from "react";
import "./chatdesgin.css";
import Emptyview from './emptynotecomponent.jsx';
import Noteview from './createnotecomponent.jsx';



const Chat = ({ contact,onBackToContacts }) => {
 
  return (
    <div className="chat-container-outer">
      <div className="chat-container">
      {contact == null ? <Emptyview /> : <Noteview contact={contact} onBackToContacts={onBackToContacts} />}
      </div>
    </div>
  );
};


export default Chat;
