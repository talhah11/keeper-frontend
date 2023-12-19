import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your components for different routes
import Home from './components/Home';
import NoteState from './context/notes/noteState';
import Login from './components/Login';
import Signup from './components/Signup';
// import Footer from './components/footer';




function App() {


  return (
    <>
      <NoteState>

        <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
            </Routes>
        </Router>
        {/* <Footer/> */}

      </NoteState>
    </>
  );
}

export default App;
