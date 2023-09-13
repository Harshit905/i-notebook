import React, { useContext,useEffect } from 'react'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import noteContext from "../context/notes/noteContext"

const Notes = () => {
    const context = useContext(noteContext)
    const { notes,getNotes} = context;
    // const { notes} = context;
    useEffect(() => {
      getNotes()
    }, [])
    const updateNote=(note)=>{
        
    }
    return (
        <div className='container my-3'>
         <AddNote/>
            <h1>Your Notes</h1>
            {notes.map((note) => {
                return <Noteitem key={note._id} updateNote={updateNote} note={note} />
            })}
        </div>
    )
}

export default Notes
