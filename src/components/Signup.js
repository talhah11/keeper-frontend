import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import HighlightIcon from '@mui/icons-material/Highlight';
import '../styles/authentication.css'
import ClipLoader from "react-spinners/ClipLoader";


const Signup = () => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  let navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });

    if (name === 'cpassword') {
      setPasswordsMatch(value === credentials.password);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (credentials.cpassword !== credentials.password) {
      setLoading(false);
      setError('Passwords do not match.')
      return;
    }

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/createUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
    });
    const json = await response.json()
    if (json.authToken) {
      //save authToken and redirect to home
      localStorage.setItem('token', json.authToken)
      navigate('/');
      setLoading(false);
    }
    else if (response.status === 400) {
      setError("A User with this email address already exists.")
      setLoading(false);
      return;
    }
    else {
      console.log("Cannot Sign up")
      setLoading(false);
    }

  }

  return (
    <>




      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div className="card border-0 shadow mx-auto" style={{ width: '400px', height: '620px' }}>

          <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit}>
              <div className="container d-flex justify-content-center">
                <h1><HighlightIcon />Keeper</h1>
              </div>


              <h1 className="h3 my-3 fw-normal">Create a new account</h1>

              <div className="form-floating" style={{
                top: '1px'
              }}>
                <input type="text" required autoComplete='off' className="form-control" id="name" placeholder="name" name='name' onChange={handleChange} value={credentials.name} style={{ borderBottomLeftRadius: '0', borderBottomRightRadius: '0', }} />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating" >
                <input type="email" required autoComplete='off' className="form-control" id="email" placeholder="name@example.com" name='email' aria-describedby="emailHelp" onChange={handleChange} value={credentials.email} style={{ borderRadius: 0 }} />
                <label htmlFor="email">Email address</label>
              </div>
              <div className="form-floating" >
                <input type="password" required className="form-control" id="password" placeholder="Password" name='password' onChange={handleChange} value={credentials.password} style={{ borderRadius: 0 }} />
                <label htmlFor="password">Password</label>
              </div>
              <div className="form-floating" style={{ top: '-11px' }}>
                <input type="password" required className="form-control" id="cpassword" placeholder="Confirm Password" name='cpassword' onChange={handleChange} value={credentials.cpassword} />
                <label htmlFor="cpassword">Confirm Password</label>
                {passwordsMatch && ( // Display green tick when passwords match
                  <span style={{ color: 'green', position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '266px' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-check-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.977 13.023a.75.75 0 1 1-1.06-1.06l-3-3a.75.75 0 0 1 1.06-1.06L6 10.94l6.477-6.477a.75.75 0 0 1 1.06 1.06l-7 7z" />
                    </svg>
                  </span>
                )}
              </div>

              {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
              <button className="btn btn-warning w-100 py-2" style={{ color: 'white' }} type="submit">
                {loading ? (
                  <ClipLoader color={'#ffffff'} loading={loading} size={20} />
                ) : (
                  'Create Account'
                )}
              </button>

              <div className="mt-3 text-center">
                <Link className="px-2 position-relative" to='/login'>Already have an account?</Link>
              </div>


            </form>
          </main>
        </div>

      </div>

    </>
  )
}

export default Signup
