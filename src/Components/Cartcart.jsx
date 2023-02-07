import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
const Cartcart = (itemdata) => {
  const [productQuanty, setproductQuanty] = useState(itemdata.itemdata.quantity);
  const increQuanty = () => {
    setproductQuanty(productQuanty + 1);
  };
  const DecreQuanty = () => {
    if (productQuanty >= 1) {
      setproductQuanty(productQuanty - 1);
    }
  };

  return (
    <div className="d-flex justify-content-center align-item-center flex-row flex-wrap">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={itemdata.itemdata.product.productimage} />
        <Card.Body>
          <Card.Title>Title: {itemdata.itemdata.product.producttitle}</Card.Title>
          <Card.Text>
         Description:  {itemdata.itemdata.product.description}
          </Card.Text>
          <Card.Text>
           Rs: {itemdata.itemdata.product.price}
          </Card.Text>
          <Card.Text>
         Warranty: {itemdata.itemdata.product.warranty}
          </Card.Text>
          <Button onClick={increQuanty}>+</Button>
          <p className="mt-3 mx-3">{productQuanty}</p>
          <Button onClick={DecreQuanty}>-</Button>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Cartcart;
// {itemdata.itemdata.product.producttitle}
