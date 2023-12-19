import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import HighlightIcon from '@mui/icons-material/Highlight';
import '../styles/authentication.css'
// import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";



const Login = () => {


    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    let navigate = useNavigate();

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (e) => {
        setError(null);
        e.preventDefault();
        setLoading(true); // Set loading to true when form is submitted


        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });
            const json = await response.json();
            if (json.authToken) {
                localStorage.setItem('token', json.authToken);
                navigate('/');
            } else {
                setError('Invalid Credentials.')
                console.log("Invalid Credentials");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false); // Set loading to false when request is completed
        }
    }


    return (

        <>

            <div className="container-fluid d-flex justify-content-center align-items-center vh-100">

                <div className="card border-0 shadow mx-auto" style={{
                    width: '400px',
                    height: '620px',
                }}>
                    <main className="form-signin w-100 m-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="container d-flex justify-content-center">
                                <h1><HighlightIcon />Keeper</h1>
                            </div>


                            <h1 className="h3 my-3 fw-normal">Please sign in</h1>

                            <div className="form-floating">
                                <input type="email" autoComplete='off' className="form-control" id="email" placeholder="name@example.com" name='email' aria-describedby="emailHelp" onChange={handleChange} value={credentials.email} />
                                <label htmlFor="email">Email address</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" required className="form-control" id="password" placeholder="Password" name='password' onChange={handleChange} value={credentials.password} />
                                <label htmlFor="password">Password</label>

                            </div>

                            <div className="form-check text-start my-3">
                                <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Remember me
                                </label>
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
                            <button className="btn btn-warning w-100 py-2" style={{ color: 'white' }} type="submit">
                                {loading ? (
                                    <ClipLoader color={'#ffffff'} loading={loading} size={20} />
                                ) : (
                                    'Sign in'
                                )}
                            </button>
                            <div className="mt-3 text-center">
                                <hr className="w-100 mx-auto" />
                                <span className="px-2 position-relative" style={{ top: '-10px' }}>or</span>
                            </div>

                            <Link className="btn btn-success w-100 py-2" type="submit" to='/signup'>Create a new account</Link>


                        </form>
                    </main>

                </div>


            </div>
        </>
    )
}

export default Login
