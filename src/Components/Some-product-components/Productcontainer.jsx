import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
const Productcontainer = (product) => {
  let p = product.product;

  return (
    <div className="my-1">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={p.productimage} />
        <Card.Body>
          <a className="Links" href={`/product/${p.producttype}/${p.id}`}>
            {" "}
            <Card.Title>Product Title {p.producttitle}</Card.Title>
          </a>
          <Card.Title>Rs {p.price}</Card.Title>
          <Card.Text>Description: {p.description}</Card.Text>
          <Card.Text>Customer Support: {p.customersupport}</Card.Text>
          <Card.Text>Warranty: {p.warranty}</Card.Text>
          <a href={`/product/${p.producttype}/${p.id}`}> <Button className="item-button">More Details &gt;</Button></a>

        </Card.Body>
      </Card>
    </div>
  );
};

export default Productcontainer;

// <Card style={{width:"40vh",height:"20vh"}}>
//         <Card.Img variant="top" src={p.productimage} />
//         <Card.Body>
//           <Card.Title>{p.producttitle}</Card.Title>
//           <Card.Title>
//           {p.description}
//           </Card.Title>
//         </Card.Body>

//       </Card>
