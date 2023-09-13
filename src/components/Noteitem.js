import React,{useContext} from 'react'
import noteContext from "../context/notes/noteContext"
import './NoteItem.css'; // Create this CSS file for styling
const NoteItem = (props) => {

    const { note,updateNote } = props;
    const context = useContext(noteContext);
    const {deleteNote}=context;
    return ( 
            <div className="note-card my-2">
                <div className="note-header">
                    <h3>{note.title}</h3>
                    <div className="note-icons">
                        <i className="fas fa-edit" onClick={()=>{updateNote(note)}}></i>
                        {/* <i className="fas fa-edit" onClick={onEditClick}></i> */}
                        <i className="fas fa-trash-alt" onClick={()=>(deleteNote(note._id))}></i>
                        {/* <i className="fas fa-trash-alt" onClick={onDeleteClick}></i> */}
                    </div>
                </div>
                <p className="note-description">{note.description}</p>
                {/* <p className="note-date">{date}</p> */}
            </div>
        
    )
}

export default NoteItem
