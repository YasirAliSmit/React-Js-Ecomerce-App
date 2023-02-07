import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import { db, auth } from "../../firebaseConfig/firebaseConfig";
import { addDoc, doc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { collection, getDocs, query, where } from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import swal from "sweetalert";
import ProductSlider from "./ProductSlider";
const SpacificProductPage = () => {
  const { id, type } = useParams();
  const [product, setProduct] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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

  function GetCurrentProduct() {
    useEffect(() => {
      const getProduct = async () => {
        const docRef = doc(db, `products-${type.toUpperCase()}`, id);
        const docSnap = await getDoc(docRef);
        setProduct(docSnap.data());
      };
      getProduct();
    }, []);
    return product;
  }
  GetCurrentProduct();
  function addCart() {
    if (loggeduser) {
      addDoc(collection(db, `cart-${loggeduser[0].uid}`), {
        product,
        quantity: 1,
      })
        .then(() => {
          setSuccessMsg("Product add to cart");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      setErrorMsg("You have to LogIn First");
      swal("Oops!", "You have to LogIn First", "error");
    }
  }
  return (
    <div>
      <Navbar />
      {product ? (
        <>
          <div className="d-flex align-item-center justify-content-center my-3">
            {" "}
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={product.productimage} />
              <Card.Body>
                <Card.Title>{product.producttitle}</Card.Title>
                <Card.Title>Rs {product.price}</Card.Title>
                <Card.Text>Description: {product.description}</Card.Text>
                <Card.Text>
                  Customer Support: {product.customersupport}
                </Card.Text>
                <Card.Text>Warranty: {product.warranty}</Card.Text>
                <Button variant="primary">Buy</Button>
                <Button className="mx-2" onClick={addCart} variant="primary">
                  Add Cart
                </Button>
              </Card.Body>
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
            </Card>
          </div>
        </>
      ) : (
        <div>Loading....</div>
      )}
       <h3 className="Auth-form-title">Similar Products</h3>
       <ProductSlider type={type}></ProductSlider>
    </div>
  );
};
export default SpacificProductPage;
