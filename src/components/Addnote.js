import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';


const Addnote = () => {
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (event) => {
        event.preventDefault();

        if (note.title.trim() !== "" || note.description.trim() !== "") {
            addNote(note.title, note.description, note.tag);
            setNote({ title: "", description: "", tag: "" });
        }
    };

    const handleChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }

    const [isExpanded, setExpanded] = useState(false);
    function expand() {
        setExpanded(true);
    }


    return (
        <div>
            <form className="create-note" onSubmit={(event) => {
                event.preventDefault();
                handleClick(event);
            }}>
                {isExpanded && (
                    <input
                        name="title"
                        id='title'
                        value={note.title}
                        onChange={handleChange}
                        placeholder="Title"
                    />
                )}

                <textarea
                    name="description"
                    onClick={expand}
                    id='description'
                    value={note.description}
                    onChange={handleChange}
                    placeholder="Take a note..."
                    rows={isExpanded ? 3 : 1}
                />
                <Zoom in={isExpanded}>
                    <Fab  type='submit' onClick={handleClick}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>

    )
}

export default Addnote
