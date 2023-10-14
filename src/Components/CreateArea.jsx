import React, { useState, useEffect, useRef } from 'react';
import Zoom from '@mui/material/Zoom';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

const CreateArea = ({ onAdd, }) => {
    const [note, setNote] = useState({
        title: "",
        content: ""
      });
    const [isExpanded, setExpanded] = useState(false);
    
    const createAreaRef = useRef(null);

    useEffect(() => {
        // Attach click event listener to the document
        const handleClickOutside = (event) => {
            if (createAreaRef.current && !createAreaRef.current.contains(event.target)) {
                setExpanded(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            // Clean up the click event listener when component unmounts
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNote(prevNote => {
            return { ...prevNote, [name]: value };
        });
    }

    const submitNote = (e) => {
        (note.title && note.content !== "") &&
            (onAdd(note), setNote({
                title: "",
                content: ""
            }));
        e.preventDefault();
    }

    return (
        <form className="create-note" ref={createAreaRef}>
            {isExpanded && (
                <input
                    name="title"
                    onChange={handleChange}
                    value={note.title}
                    placeholder="Title"
                    required
                />
            )}
            <textarea
                name="content"
                onClick={() => setExpanded(true)}
                onChange={handleChange}
                value={note.content}
                onFocus={() => setExpanded(true)}
                placeholder="Take a note..."
                required
                rows={isExpanded ? 3 : 1}
            />
            <Zoom in={isExpanded}>
                <Fab onClick={submitNote}>
                    <AddIcon />
                </Fab>
            </Zoom>
        </form>
    );
}

export default CreateArea;
