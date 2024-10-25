import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Muestra = () => {
  return (
    <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://digital.ihg.com/is/image/ihg/intercontinental-paris-4638135680-16x9"
        alt="Primera imagen"
        style={{ height: '400px', objectFit: 'cover' }} // Ajustar altura y tipo de ajuste
      />
      <Carousel.Caption>
        <h3>Primera Imagen</h3>
        <p>Descripción de la primera imagen.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://static11.com-hotel.com/uploads/hotel/36897/photo/hotel-hd_15522941803.jpg"
        alt="Segunda imagen"
        style={{ height: '400px', objectFit: 'cover' }} // Ajustar altura y tipo de ajuste
      />
      <Carousel.Caption>
        <h3>Segunda Imagen</h3>
        <p>Descripción de la segunda imagen.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1020,q_auto,w_2000/hotelier-images/7f/33/acb8ffb977e6ac835f6732951eab192a3e474ae06357562cbadb05694200.jpeg"
        alt="Tercera imagen"
        style={{ height: '400px', objectFit: 'cover' }} // Ajustar altura y tipo de ajuste
      />
      <Carousel.Caption>
        <h3>Tercera Imagen</h3>
        <p>Descripción de la tercera imagen.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);
}

export default Muestra;
