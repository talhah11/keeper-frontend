import { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {
    const host = process.env.REACT_APP_BACKEND_URL;
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    const initialiseNotes = ()=>{
        setNotes([]);
    }

    const getNotes = async ()=>{
        //API Call
        const response = await fetch(`${host}/api/notes/getAllNotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotes(json);
    }

    //Add a note
    const addNote = async (title, description, tag) => {
        //TODO API call
        //API Call
        const response = await fetch(`${host}/api/notes/addNote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();
        console.log(json);


        const note = json;

        setNotes(notes.concat(note));

    }

      
    //Delete a note
    const deleteNote = async (id) => {
        //API Call
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);

        //Client side deletion
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {

        //API Call
        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });

        console.log(response.json());

        let newNotes = JSON.parse(JSON.stringify(notes));



        //Client side logic to edit note
        for (let i = 0; i < newNotes.length; i++) {
            const element = newNotes[i];
            if (element._id === id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
        }

        setNotes(newNotes);

    }

    

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, initialiseNotes }}>
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteState;