import React from "react";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  getDoc,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../firebaseConfig/firebaseConfig";

import Navbar from "../Navbar";
import { useState } from "react";
import { useEffect } from "react";
import Productcontainer from "./Productcontainer";
const Allproduct = (props) => {
  const [product, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = () => {
      const productArray = [];
      const path = `products-${props.type.toUpperCase()}`;

      getDocs(collection(db, path))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            productArray.push({ ...doc.data(), id: doc.id });
          
          });
          setProducts(productArray);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <h3 className="Auth-form-title ">Top Results For {props.type}</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {product.map((product) => {
          return <Productcontainer key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Allproduct;
