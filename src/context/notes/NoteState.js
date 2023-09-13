import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
// Get all Notes
const getNotes = async () => {
  // API Call 
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlOTllYmExMzE0Y2MxMjMyZDBjMWQxIn0sImlhdCI6MTY5MzAzMjE4NH0.Bnpyy3eRdK9d4mmHgdz9HLH9QAjSd71xIFTHAwFbYBU"
    }
  });
  const json = await response.json() 
  console.log(json)
  setNotes(json)
}





  const [notes, setNotes] = useState(notesInitial);



  // Add a Note
  const addNote =async (title, description, tag) =>{
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlOTllYmExMzE0Y2MxMjMyZDBjMWQxIn0sImlhdCI6MTY5MzAzMjE4NH0.Bnpyy3eRdK9d4mmHgdz9HLH9QAjSd71xIFTHAwFbYBU"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 
    const note = {
      "_id": "61322f1195jhgj53781a8ca8d0e08",
      "user": "6131dc5e3e4037cd4734a0664",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-03T14:20:09.6687",
      "v": 0
    };
  setNotes(notes.concat(note))

  }

  // Delete a Note
  const deleteNote = async (id) => {
    // console.log("delete "+id)
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlOTllYmExMzE0Y2MxMjMyZDBjMWQxIn0sImlhdCI6MTY5MzAzMjE4NH0.Bnpyy3eRdK9d4mmHgdz9HLH9QAjSd71xIFTHAwFbYBU"
      }
    });
    const json = await response.json(); 
    const newNotes=notes.filter((note)=>{return note._id!==id});
    setNotes(newNotes);
  }
  // Edit a Note
  const editNote =async (id,title, description, tag ) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRlOTllYmExMzE0Y2MxMjMyZDBjMWQxIn0sImlhdCI6MTY5MzAzMjE4NH0.Bnpyy3eRdK9d4mmHgdz9HLH9QAjSd71xIFTHAwFbYBU"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json(); 

     let newNotes = JSON.parse(JSON.stringify(notes))



    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
  }



  return (
    <NoteContext.Provider value={{notes,addNote, deleteNote, editNote,getNotes}}>
    {/* // <NoteContext.Provider value={{ notes }}> */}
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
