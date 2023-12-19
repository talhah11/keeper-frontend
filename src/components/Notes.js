import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom'



const Notes = () => {
    


    let navigate = useNavigate();

    const context = useContext(noteContext)
    const { notes, getNotes } = context;

    useEffect(() => {

        if (localStorage.getItem('token')) {
          getNotes();
        }
        else {
          navigate('/login');
        }
        // eslint-disable-next-line
      }, [])

    


    return (
        
        <>
        <Addnote />
        <div className="row my-3">
            
            {notes.map((note)=>{
                return <Noteitem key = {note._id} note = {note} />
            })}
        </div>
        </>
    )
}

export default Notes
