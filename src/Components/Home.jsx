import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Product from "./Product";
import Banner from "./Banner";
import { auth, db } from "../firebaseConfig/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { async } from "@firebase/util";
import ProductSlider from "./Some-product-components/ProductSlider";
import SliderProductCard from "./Some-product-components/SliderProductCard";
const Home = () => {
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
    <div>
      <Navbar />
      <Banner />
      <p className="Auth-form-title mt-3">Limited Time Deals</p>

     <ProductSlider type={'Mobile'}/>
     <ProductSlider type={'Tablet'}/>
     <ProductSlider type={'Camera'}/>
     <ProductSlider type={'Led'}/>
    </div>
  );
};

export default Home;
