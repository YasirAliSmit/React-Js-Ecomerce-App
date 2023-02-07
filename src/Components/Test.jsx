import CloseButton from 'react-bootstrap/CloseButton';
import "bootstrap/dist/css/bootstrap.css";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";



import Dropdown from 'react-bootstrap/Dropdown';

function BasicExample() {
  return (
    <Dropdown>
         <Dropdown.Toggle className='drop'  >

        <CloseButton aria-label="Hide" >
        <Dropdown.Menu>
        <div className="test">
<div>
  <Link className="Link" to="/">  <Button variant="light">Home</Button> </Link>
</div>
<div >
  {" "}
  <Link className="Link " to="/signup"> <Button variant="light"> Register</Button></Link>
</div>
<div>
  {" "}
  <Link to="/login" className="Link" ><Button variant="light"> Login</Button></Link>
</div>
<div>
  {" "}
  <Link className="Link" to="/cart">
  <Button variant="light">  <AiOutlineShoppingCart  size="25px" /></Button>
  </Link>
</div>
<div>

    <Link className="int" to="/cart"><Button variant="light"> 0</Button></Link>

</div>
<div>

    <Link className="Link" to="/userprofile">
    <Button variant="light">  <AiOutlineUser   size="25px"  /></Button>
    </Link>
</div>
</div>
      </Dropdown.Menu> 
      </CloseButton>
     
      
        </Dropdown.Toggle>
    </Dropdown>
  );
}

export default BasicExample;

























// function LabelledExample() {
//   return <CloseButton aria-label="Hide" >
//     <div className="test">
// <div>
//   <Link className="Link" to="/">  <Button variant="light">Home</Button> </Link>
// </div>
// <div >
//   {" "}
//   <Link className="Link " to="/signup"> <Button variant="light"> Register</Button></Link>
// </div>
// <div>
//   {" "}
//   <Link to="/login" className="Link" ><Button variant="light"> Login</Button></Link>
// </div>
// <div>
//   {" "}
//   <Link className="Link" to="/cart">
//   <Button variant="light">  <AiOutlineShoppingCart  size="25px" /></Button>
//   </Link>
// </div>
// <div>

//     <Link className="int" to="/cart"><Button variant="light"> 0</Button></Link>

// </div>
// <div>

//     <Link className="Link" to="/userprofile">
//     <Button variant="light">  <AiOutlineUser   size="25px"  /></Button>
//     </Link>
// </div>
// </div>

//   </CloseButton>;
// }

// export default LabelledExample;