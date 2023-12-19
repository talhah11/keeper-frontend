import React, { useState,useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import { useNavigate } from 'react-router-dom'
import HighlightIcon from '@mui/icons-material/Highlight';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  let navigate = useNavigate();
  
  const [username, setUsername] = useState('')

  const context = useContext(noteContext)
  const { initialiseNotes } = context;

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    initialiseNotes();
  }

  const getUsername = async (token) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/getUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setUsername(json.name)
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUsername();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  });

  return (
    <>
      <header>
        <h1><HighlightIcon />Keeper</h1>


        <div className="d-flex flex-wrap align-items-center justify-content-between" style={{ marginLeft: "auto" }}>

          <div className="text-end">
            <div className="dropdown">
              <button className="d-block link-body-emphasis text-decoration-none" style={{    border: 'none', backgroundColor: '#f5ba13'}} data-bs-toggle="dropdown" aria-expanded="false">
                <MenuIcon style={{ color: '#FFF', cursor: 'pointer' }} />
              </button>
              <ul className="dropdown-menu dropdown-menu-end text-small">
                <li><div className="dropdown-item">{username}</div></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item text-danger"  onClick={handleLogout}>Sign out</button></li>
              </ul>
            </div>
          </div>
        </div>

      </header>
    </>
  )
}

export default Navbar
