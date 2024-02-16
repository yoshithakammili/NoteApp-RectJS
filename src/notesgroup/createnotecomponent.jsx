import React, { useState, useEffect } from "react";
import NoteService from "./NoteService";
import "./chatdesgin.css";
import send from "./send.png";
import senddisable from "./send_disable.png";
import backarrow from "./back_arrow.png";

function CreateNoteComponent({ contact, onBackToContacts}) {
  const [getAllNotes, setGetAllNotes] = useState([]);
  const [getColor, setColor] = useState([]);
  const [inputvalue, setInputValue] = useState([]);


  useEffect(() => {
    // console.log("Fetching notes for contact:", contact);
    // const notes = NoteService.getNotesByNoteName(contact);
    // console.log("Notes for contact:", notes);
    // setGetAllNotes(notes);

    console.log("Fetching notes for contact:", contact);
    const notesWithColor = NoteService.getNotesByNoteName(contact);
    console.log("Notes for contact:", notesWithColor);
    setColor(notesWithColor.color);
    if (Array.isArray(notesWithColor.notes)) {
      setGetAllNotes(notesWithColor.notes);
    } else {
      console.error("Notes for contact is not an array:", notesWithColor);
      setGetAllNotes([]);
    }
  }, [contact]); // Trigger useEffect when the contact prop changes


  const handleSend = (note) => {
    console.log("selected note =" + note);
    if(inputvalue!=""){
    // NoteService.addNoteToGroup(contact, note);
    const updatedNotes = [
      ...getAllNotes,
      { note: inputvalue, timestamp: new Date().getTime() },
    ];
    setGetAllNotes(updatedNotes);

    // Add the new note to the database
    NoteService.addNoteToGroup(contact, inputvalue);

    // Clear the input value after sending
    setInputValue("");
  }
  };

  const getFirstCharacter = (noteName) => {
    if (noteName != null) {
      const words = noteName.split(" ");
      if (words.length === 1) {
        // return noteName.substring(0, 2);
        return noteName.charAt(0);
      } else {
        // If multiple words, return the first character of the second word
        return words[0].charAt(0) + words[1].charAt(0);
      }
    }
  };

  return (
    <div>
      <div className="chatHeader">
        <div className="back-button-mobile">
          <img onClick={onBackToContacts} className="back-button" src={backarrow}/>
        </div>
        <div
          className="circle-name"
          style={{
            backgroundColor: getColor,
            width: 45,
            height: 45,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <span style={{ color: "#fff" }}>{getFirstCharacter(contact)}</span>
        </div>
        <span>{contact}</span>
      </div>

      <div className="chat-list-container">
        {getAllNotes.length !== 0 ? (
          getAllNotes.map((note, index) => <Card key={index} note={note} />)
        ) : (
          <p>Please add notes</p>
        )}
      </div>

      <div className="footer">
        <div className="input-container">
          <textarea
            className="input-field"
            rows="4"
            value={inputvalue}
            placeholder="Enter your text here..........."
            onChange={(e) => setInputValue(e.target.value)}
          ></textarea>
          <div className="input-image" onClick={() => handleSend(inputvalue)}>
            {inputvalue !== "" ? (
              <img src={send} alt="Send" width={25} height={25} />
            ) : (
              <img src={senddisable} alt="Send" width={25} height={25} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
const formatDate = (milliseconds) => {
  const date = new Date(milliseconds);
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  let hour = date.getHours();
  let minute = date.getMinutes();
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  minute = minute < 10 ? "0" + minute : minute;
  return `${day} ${month} ${year} . ${hour}:${minute}${ampm}`;
};

const Card = ({ note }) => {
  return (
    <div className="card">
      <div className="text">{note.note}</div>
      <span className="text-date">{formatDate(note.timestamp)}</span>
    </div>
  );
};
export default CreateNoteComponent;
