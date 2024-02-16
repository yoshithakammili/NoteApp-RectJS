import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NotesGroupDesgin.css";
import Dialog from "./GroupNameDialog.jsx";
import NoteService from "./NoteService";
import myImage from "./add.png";
import ReactDOM from "react-dom";

const Contacts = ({ onSelectContact }) => {
  // const contacts = [
  //   /* Array of contacts */
  // ];

  // return (
  //   <div>
  //     <h2>Contact List</h2>
  //     <ul>
  //       {contacts.map((contact) => (
  //         <li key={contact.id}>
  //           {/* Link to the chat screen for the current contact */}
  //           <Link to={`/chat/${contact.id}`}>{contact.name}</Link>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [getAllNotesWithColors, setGetAllNotesWithColors] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState("");

  const [addNoteGroup, setaddNoteGroup] = useState([]);

  useEffect(() => {
    // Retrieve list items from local storage when the component mounts
    const fetchAllNotesWithColors = () => {
      const allNotesWithColors = NoteService.getAllNotesWithColors();
      setGetAllNotesWithColors(allNotesWithColors);
    };
    fetchAllNotesWithColors();
  }, []);

  const handleStickyButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleContactSelect = (contactName, index) => {
    console.log("selected contactName =" + contactName);
    setSelectedNoteIndex(index);
    onSelectContact(contactName);
  };

  const handleSaveContent = (content, color) => {
    // // Add new item to the list
    // setListItems([...listItems, content]);
    // // Save list items to local storage
    // localStorage.setItem("listItems", JSON.stringify([...listItems, content]));

    const updatedNotes = [
      ...getAllNotesWithColors,
      { noteName: content, color: color },
    ];
    setGetAllNotesWithColors(updatedNotes);

    console.log("selected color =" + color + "Content ==" + content);
    NoteService.addNoteGroup(content, color);
  };

  return (
    <div className="app-container">
      <header className="header">Pocket Notes</header>
      <div>
        <div className="list-container">
          {getAllNotesWithColors.map((note, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 25,
                cursor: "pointer",
                backgroundColor:
                  index === selectedNoteIndex ? "grey" : "transparent",
              }}
              onClick={() => handleContactSelect(note.noteName, index)}
            >
              <div
                style={{
                  backgroundColor: note.color,
                  width: 45,
                  height: 45,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <span style={{ color: "#fff", fontWeight: 700 }}>
                  {getFirstCharacter(note.noteName).toUpperCase()}
                </span>
              </div>
              <span style={{ color: "#000", fontWeight: 500 }}>
                {capitalizeFirstLetter(note.noteName)}
              </span>
            </div>
          ))}
        </div>
      </div>
      
        <img className="sticky-button" onClick={handleStickyButtonClick} src={myImage}  width={60} height={60}/>
      
      {isDialogOpen && 
          ReactDOM.createPortal(
            <Dialog
              title="Create New Group"
              onSave={handleSaveContent}
              onClose={handleCloseDialog}
            />,
            document.body
          )}
    </div>
  );
};

const getFirstCharacter = (noteName) => {
  const words = noteName.split(" ");
  if (words.length === 1) {
    // return noteName.substring(0, 2);
    return noteName.charAt(0);
  } else {
    // If multiple words, return the first character of the second word
    return words[0].charAt(0) + words[1].charAt(0);
  }
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export default Contacts;
