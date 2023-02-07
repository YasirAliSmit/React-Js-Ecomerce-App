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
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SliderProductCard from "./SliderProductCard";

const ProductSlider = (props) => {
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
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
    <div>
      <Carousel responsive={responsive}>
        {product.map((product) => (
          <SliderProductCard key={product.id} product={product} />
        ))}
      </Carousel></div>
      ;
    </>
  );
};
export default ProductSlider;

// {product.map((product) => {
//   <SliderProductCard key={product.id} product={product} />;
// })}
