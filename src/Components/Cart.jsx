import React from "react";
import Navbar from "./Navbar";
import { auth, db } from "../firebaseConfig/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Cartcart from "./Cartcart";
const Cart = () => {
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
  const [cartData, setcartdata] = useState([]);
  const loggeduser = GetCurrentUser();
  if (loggeduser) {
    const getCartData = async () => {
      const cartArray = [];
      const path = `cart-${loggeduser[0].uid}`;
      getDocs(collection(db, path))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            cartArray.push({ ...doc.data(), id: doc.id });
          });
          setcartdata(cartArray);
        })
        .catch(`error`);
    };
    getCartData();
  }
  return (
    <div>
      <Navbar />
      {cartData ? (
  <>
    <h3 className="Auth-form-title">Your Cart Item</h3>
    <div>
      {cartData.map((item) => (
        <Cartcart key={item.id} itemdata={item} />
      ))}
    </div>
  </>
) : (
  <h3 className="Auth-form-title">Your Cart Is Empty</h3>
)}    
    </div>
  );
};

export default Cart;

  
        // {cartData ? (
        //   <>
        //     <h3 className="Auth-form-title">Your Cart Item</h3>
        //     <div>
        //       {cartData.map((item) => {
        //         <Cartcart key={item.id} itemdata={item} />;
        //       })}
        //     </div>
        //   </>
        // ) : (
        //   <h3 className="Auth-form-title">Your Cart Is Empty</h3>
        // )}