import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebaseConfig/firebaseConfig";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getDownloadURL , ref , uploadBytes } from "firebase/storage";
import Swal from 'sweetalert2'
import '../App.css'
const Addporduct = () => {
  const [producttitle,setProductTitle] = useState('')
  const [producttype,setProductType] = useState('')
  const [description,setDescription] = useState('')
  const [brand,setBrand] = useState('')
  const [customersupport,setCustomersupport] = useState('')
  const [price,setPrice] = useState('')
  const [warranty,setWarranty] = useState('')
  const [productimage,setProductImage] = useState('')

  const[imageError,setImageError] = useState('')
  const [successMsg,setSuccessMsg] = useState('')
  const [uploadError,setUploadError] = useState('')
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
  function handleAddProduct(e){
e.preventDefault()
const storageRef = ref(storage,`product-images ${producttype.toUpperCase()}/${Date.now()}`)//ref mea ya define krna hota hea kha store krna hea.
// console.log(storageRef._location.path) 
uploadBytes(storageRef,productimage).then(()=>{
  getDownloadURL(storageRef).then(url=>{
    addDoc(collection(db,`products-${producttype.toUpperCase()}`),{
      producttitle,
      producttype,
      description,
      brand,
      customersupport,
      price,
      warranty,
      productimage:url
    })
  })
  Swal.fire(
    'Good job!',
    'Product Added Successfully , In Your Firebase Database',
    'success'
  )
  
})












}
  const loggeduser = GetCurrentUser();
  //       if(loggeduser){
  // console.log(        loggeduser[0].email
  //     )
  //     }
  const types = ['image/jpg','image/jpeg','image/png','image/PNG']
  function handleProductImage(e){
e.preventDefault()
let selectedFile = e.target.files[0]
if(selectedFile){
if(selectedFile&& types.includes(selectedFile)){
  setProductImage(selectedFile)
  setImageError('')
}else{
  setProductImage(null)
  setImageError('Please Select a Valid Image File type(png or jpg)')
}

}else{
  setImageError('Please Select Your File')
}
  }
  return (
    <div>
      <Navbar />
      <div>
        {loggeduser && loggeduser[0].email == "yasir.raza@gmail.com" ?  <div style={{height:'100vh'}} className=" d-flex justify-content-center align-items-center">

        <Form className="add-item col-xxl-5 col-xl-5 col-md-5">
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <h3 className="Auth-form-title">Add Product</h3>
      {successMsg && (
              <>
                <div className="btn btn-success">{successMsg}</div>
              </>
            )}
            {uploadError && (
              <>
                <div className="btn btn-danger">{uploadError}</div>
              </>
            )}
        <Form.Label>Product Title</Form.Label>
        <Form.Control type="text" onChange={(e)=>setProductTitle(e.target.value)} placeholder="Enter Product Title" />
        
        <Form.Label>Product Type</Form.Label>
        <Form.Control type="text" onChange={(e)=>setProductType(e.target.value)} placeholder="Enter Product Type" />
        
        <Form.Label>Brand Name</Form.Label>
        <Form.Control type="text" onChange={(e)=>setBrand(e.target.value)} placeholder="Enter Brand Name" />
        
        <Form.Label>Product Warranty</Form.Label>
        <Form.Control type="text" onChange={(e)=>setWarranty(e.target.value)} placeholder="Enter Product Warranty" />
        
        <Form.Label>Upload Image</Form.Label>
        <Form.Control type="file" onChange={handleProductImage} placeholder="Enter Product Image" />
        {imageError&&<><div className="btn btn-danger">{imageError}</div></>}

        <Form.Label>Description</Form.Label>
        <Form.Control type="text" onChange={(e)=>setDescription(e.target.value)} placeholder="Enter Product Description" />
        
        <Form.Label>Price Without Tax</Form.Label>
        <Form.Control type="text" onChange={(e)=>setPrice(e.target.value)} placeholder="Price with out tax" />
        
        <Form.Label>Customer Support</Form.Label>
        <Form.Control type="text" onChange={(e)=>setCustomersupport(e.target.value)} placeholder="Customer Support Email,Phone or address" />
        
      </Form.Group>

           <Button  onClick={handleAddProduct} >
            Add Product
      </Button>
    </Form>


        </div>: <div className="Auth-form-title">You do not have a access to add product</div>}
      </div>
    </div>
  );
};

export default Addporduct;
