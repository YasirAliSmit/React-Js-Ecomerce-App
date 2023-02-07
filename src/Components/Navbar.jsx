import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.css";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig/firebaseConfig";
import { collection, getDocs, query, QuerySnapshot, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Swal from 'sweetalert2'
import Cart from "./Cart";
import { async } from "@firebase/util";


function Navbar() {
  
  function GetCurrentUser() {
    const [user, setUser] = useState("");
    const userCollectionRef = collection(db, "users");
    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
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
  const loggeduser = GetCurrentUser();
  const navigate = useNavigate();
  function handleLogout() {
    auth.signOut().then(() => {
      navigate("/login");
      Swal.fire(
        'Good job!',
        'Logout In Successfully , You Will Be Redirected To LogIn Page',
        'success'
      )
    });
  }

const [cartData,setcartdata] = useState([])
if(loggeduser){
  const getCartData = async () => {
const cartArray = []
const path = `cart-${loggeduser[0].uid}`
getDocs(collection(db,path)).then((querySnapshot)=>{
  querySnapshot.forEach((doc)=>{
    cartArray.push({...doc.data(),id:doc.id})
  })
  setcartdata(cartArray)
}).catch(`error`)
  }
  getCartData()
}



  return (
    <div>
      <div className="d-flex justify-content-around flex-wrap  My-Nav">
      {!loggeduser && (
        <>
          {" "}
          
          <div>
            <Link className="Link" to="/">
              {" "}
              <Button variant="light" className="Nav-button">Home</Button>{" "}
            </Link>
          </div>
          
          <div>
            {" "}
            <Link to="/login" className="Link">
              <Button variant="light" className="Nav-button"> Login</Button>
            </Link>
          </div>
          <div>
            {" "}
            <Link to="/signup" className="Link">
              <Button variant="light" className="Nav-button"> SignIn</Button>
            </Link>
          </div>
          <div>
            {" "}
            <Link to="/cart"  className="Link">
              <Button variant="light" className="Nav-button">
                {" "}
                <AiOutlineShoppingCart size="25px" color="white" />
              </Button>
            </Link>
          </div>
          <div>
            <Link className="int" to="/cart">
              <Button variant="light" className="Nav-button">{cartData.length}</Button>
            </Link>
          </div>
          <div>
            <Link className="Link" to="/userprofile">
              <Button variant="light" className="Nav-button">
                {" "}
                <AiOutlineUser size="25px" />
              </Button>
            </Link>
          </div>
        </>
      )}
      {loggeduser && (
        <>
          <div>
            <Link className="Link" to="/">
              {" "}
              <Button variant="light" className="Nav-button">Home</Button>{" "}
            </Link>
          </div>
          <div>
            {" "}
            <Link className="Link " to='/addporduct'>
              {" "}
              <Button variant="light" className="Nav-button">Sell</Button>
            </Link>
          </div>
          <div>
            {" "}
            <Link className="Link" to="/cart">
              <Button variant="light" className="Nav-button">
                {" "}
               <AiOutlineShoppingCart size="25px" />
              </Button>
            </Link>
          </div>
          <div>
            <Link className="int"  to="/cart">
              <Button variant="light" className="Nav-button">{cartData.length}</Button>
            </Link>
          </div>
          <div>
            <Link className="Link" to="/userprofile">
              <Button variant="light" className="Nav-button">
                {" "}
               <AiOutlineUser size="25px" />
              </Button>
            </Link>
          </div>
          <div>
            <Button onClick={handleLogout} className="Nav-button" variant="light">
              LogOut
            </Button>
          </div>
        </>
      )}
      </div>
      <div className="product-type d-flex justify-content-around flex-wrap my-1">
      <a href="/product-types/mobiles" className="item-button"  >Mobile</a>
      <a href="/product-types/tablets" className="item-button" >Tablet</a>
      <a href="/product-types/cameras" className="item-button">Cameras</a>
      <a href="/product-types/leds" className="item-button" >leds</a>
      </div>
    </div>
  );
}
export default Navbar;

{/* <Link to="/product-types/mobiles"><Button variant="light">Mobiles</Button></Link>
<Link to="/product-types/laptops"><Button variant="light">Laptop</Button></Link>
<Link to="/product-types/cameras"><Button variant='light'>Camera</Button></Link>
<Link to="/product-types/leds"><Button variant="light">LED</Button></Link> */}

















// const [cartdata,setcartdata] = useState([])
// if(loggeduser){
//   const Getcartdata = async () => {
// const cartArray = []
// const path = `cart-${loggeduser[0].uid}`
// getDocs(collection(db,path)).then((querySnapshot)=>{
// querySnapshot.forEach((doc)=>{
// cartArray.push({...doc.data(),id:doc.id})
// })
// setcartdata(cartArray)
// }).catch('error errror error  ')
//   }
//   Getcartdata()
// }
// }