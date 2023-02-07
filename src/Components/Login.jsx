import Navbar from "./Navbar";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import Swal from 'sweetalert2'

export default function (props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
  function handleLogin(e) {
    e.preventDefault()
    signInWithEmailAndPassword(auth,email,password).then(()=>{
      setSuccessMsg('Logged In Successfully , You Will Be Redirected To Home Page')
      setEmail('')
      setPassword('')
      seterrorMsg('')
      Swal.fire(
        'Good job!',
        'Logged In Successfully , You Will Be Redirected To Home Page',
        'success'
      )
      setTimeout(()=>{
        setSuccessMsg('')
        navigate('/home')
      },3000)
    }).catch((error)=>{
      swal("Oops!", "Wrong Password!", "error");
    const errorCode = error.code
    console.log(error.message)
   if (error.message == 'Firebase: Error (auth/invalid-email)'){
seterrorMsg('Please fill all required fields')
   }
   if (error.message == 'Firebase: Error (auth/user-not-found)'){
seterrorMsg('Email not found')
   }
   if (error.message == 'Firebase: Error (auth/wrong-password)'){
seterrorMsg('Wrong Password')
   }


    })

  }
  return (
    <div>
      <Navbar />
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            {successMsg && (
              <>
                <div className="btn btn-success">{successMsg}</div>
              </>
            )}
            {errorMsg && (
              <>
                <div className="btn btn-danger">{errorMsg}</div>
              </>
            )}

            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                onClick={handleLogin}
                className="btn btn-primary"
              >
                Login 
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Don't have an account <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
