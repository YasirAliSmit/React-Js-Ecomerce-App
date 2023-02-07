import Carousel from 'react-bootstrap/Carousel';
import two from './assets/bannerimage/2.jpg'
import three from './assets/bannerimage/3.jpg'
import four from './assets/bannerimage/4.jpg'
function UncontrolledExample() {
  return (
    <Carousel className=''>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={four}
          alt="First slide"
        />
        <Carousel.Caption>
        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={two}
          alt="Second slide"
        />

        <Carousel.Caption>
     
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={three}
          alt="Third slide"
        />

        <Carousel.Caption>
       
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;