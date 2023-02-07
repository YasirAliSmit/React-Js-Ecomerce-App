import React from "react";
import Navbar from "./Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import swal from 'sweetalert';
import Swal from 'sweetalert2'
const Signup = () => {
  const [username, setUsername] = useState("");
  
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredetial) => {
        ///userCredetial ke mtlb jo bhea user kea data ho gea hmra pas aha gyea gea
        const user = userCredetial.user;
        const intialcartvalue = 0;
        
        addDoc(collection(db, "users"), {
          username: username,
          password: password,
          phonenumber: phonenumber,
          email: email,
          address: address,
          cart: intialcartvalue,
          uid: user.uid,
        }) //addDoc hme firebase mea jo data dalna hea ase kea lya use krtea hea.
          .then(() => {
            setSuccessMsg(
              "New User added successfully,You will now be automatically redirected to login page"
            );
            Swal.fire(
              'Good job!',
              "New User added successfully,You will now be automatically redirected to login page",
              'success'
            )
            setUsername("");
            setPassword("");
            setPhonenumber("");
            setEmail("");
            setAddress("");
            setErrorMsg("");
            setTimeout(() => {
              setSuccessMsg("");
              navigate("/login");
            }, 4000);
          }).catch((error)=>{setErrorMsg(error.message)})
      }
    ).catch((error)=>{
       
Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Something went wrong!',
  
})
      if(error.message == "Firebase: Error (auth/invalid-email)."){
        setErrorMsg("Please Fill the all required fields")
      }
      if(error.message == "Firebase: Error (auth/email-already-in-use)."){
        setErrorMsg("User already exists")
      }
      
    }) 
  }
  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Form className="Auth-form col-xxl-5 col-xl-5 col-md-5">
        <Form.Text className="">
          <h3 className="Auth-form-title">Create Account</h3>
        {successMsg &&<><div className="btn btn-success">{successMsg}</div></>}
        {errorMsg && <><div className="btn btn-danger">{errorMsg}</div></>}
          </Form.Text>
          <Form.Group className="mb-3" controlId="formBasicEmail">

            <Form.Label>Your Name</Form.Label>
            <Form.Control
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter Your Name"
            />

            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              onChange={(e) => setPhonenumber(e.target.value)}
              type="tel"
              placeholder="Enter Your Phone Number"
            />
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
            />
           
            
            <Form.Label>Your Address</Form.Label>
            <Form.Control
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Enter Your Address"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button className="my-btn" variant="primary" onClick={handleSubmit}>
            Sign Up
          </Button>
          <Form.Text className="text-muted">
            Already have an account?<Link to="/login">Login</Link>
          </Form.Text>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
