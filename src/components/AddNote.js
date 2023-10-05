import React,{ useState,useContext } from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = (props) => {
    const context = useContext(noteContext)
    const {addNote} = context;
    const [note, setNote] = useState({title: "", description: "", tag: ""})
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
        props.showAlert("Note Collected","success")
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    
    <div className='container my-3'>
        <h1 className='style_heading'>Draft Your Note</h1>
        <div>
         


          <form id="noteForm">
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" required value={note.title} onChange={onChange} minLength={5} />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea  id="description" name="description" rows="4" value={note.description} required onChange={onChange} minLength={5} ></textarea>
            </div>
            <div className="form-group" >
                <label>Tags:</label>
                <input type="text" id="tag" name='tag' value={note.tag} onChange={onChange}   placeholder="Add a tag" minLength={5} />
              
            </div>
            <button disabled={note.title.length<5 || note.description.length<5} type="submit" onClick={handleClick}>Collect Note</button>
        </form>
        </div>

      </div>
  )
}

export default AddNote
