import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
 
  const { deleteNote, editNote } = useContext(noteContext);
  const { note } = props;

  const [showModal, setShowModal] = useState(false);
  const [editedNote, setEditedNote] = useState({ ...note });

  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setEditedNote({ ...note });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedNote({
      ...editedNote,
      [name]: value,
    });
  };

  return (
    <div className='col-md-3'>
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div>
            <button className='btn btn-light btn-sm' onClick={() => deleteNote(note._id)} style={{ cursor: 'pointer' }}>Delete</button>
            <button className='btn btn-light btn-sm' onClick={handleShow} style={{ cursor: 'pointer', marginLeft: "10px" }}>Edit</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Note</h5>
                
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="title"
                  value={editedNote.title}
                  onChange={handleInputChange}
                  className="form-control mb-2"
                  placeholder="Title"
                />
                <textarea
                  name="description"
                  value={editedNote.description}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Description"
                ></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" style={{border: 'none'}} onClick={handleClose}>
                  Close
                </button>
                <button type="button" className="btn btn-warning" style={{color: 'white'}}  onClick={() => {
                  editNote(
                    editedNote._id,
                    editedNote.title,
                    editedNote.description,
                    editedNote.tag 
                  );
                  handleClose();
                }}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Noteitem;
