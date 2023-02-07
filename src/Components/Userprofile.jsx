import Navbar from './Navbar'
import { auth, db } from "../firebaseConfig/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
const Userprofile = () => {
  function GetCurrentUser() {
    const [user, setUser] = useState("");
    const userCollectionRef = collection(db, "users");
    useEffect(() => {
      auth.onAuthStateChanged(userlogged => {
        //userlogged ww just make a variable
        if (userlogged) {
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userlogged.uid)
              );
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        } else {
          setUser(null);
        }
      }); //onAuthStateChanged is used to check with user is login
    }, []);
    return user;
    
  }
  const loggeduser = GetCurrentUser()
  if(loggeduser){

    console.log(loggeduser[0]) 
  }
  return (
    <div >
      <Navbar/>
      <div style={{display:'flex',height:"100vh",justifyContent:'center',alignItems:'center'}}>
    <div className='user-profile '>

{loggeduser? <div className='user-profile'>
  <h3 className="Auth-form-title text-light  rounded border border-light">Your Account Details</h3>
  <div className='d-flex flex-column'>
<div><p className=" fs-4 text-center fw-bolder text-light  rounded border border-light">Username:{loggeduser[0].username}</p></div>
<div><p className=" fs-4 text-center fw-bolder text-light  rounded border border-light">Email:{loggeduser[0].email}</p></div>
<div><p className=" fs-4 text-center fw-bolder text-light  rounded border border-light">Phone Number:{loggeduser[0].phonenumber}</p></div>
<div><p className=" fs-4 text-center fw-bolder text-light  rounded border border-light">Address:{loggeduser[0].address}</p></div>

  </div>
  
</div>: <div className='d-flex flex-column justify-content-center '>  <h3 className="Auth-form-title text-light  rounded border border-light">Your Are Not LogIn</h3>
<Link to="/login" className="Link">
              <Button variant="light"> Login</Button>
            </Link>
</div>}

    </div>
    
    </div>  
    
    
    </div>
  )
}

export default Userprofile