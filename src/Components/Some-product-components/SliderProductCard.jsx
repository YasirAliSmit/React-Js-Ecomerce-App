import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
function SliderProductCard(product){
  let p = product.product
  return(<div className="my-3">
    <div className='d-flex justify-content-center align-item-cente     '>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={p.productimage} />
      <Card.Body>
        <Card.Title>Product Title {p.producttitle}</Card.Title>
        <Card.Title>
        Rs {p.price}
        </Card.Title>
        <Card.Text>
       Description: {p.description}
        </Card.Text>
        <Card.Text>
       Customer Support: {p.customersupport}
       
        </Card.Text>
        <Card.Text>
       Warranty: {p.warranty}
        </Card.Text>
    <a href={`/product/${p.producttype}/${p.id}`} > <Button className="item-button">Show More &gt;&gt;</Button> </a>  
        
      </Card.Body>
    </Card>
   </div>
    </div>)
}
export default SliderProductCard

