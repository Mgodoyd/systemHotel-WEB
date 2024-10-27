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
        alt="La mejor habitacion"
        style={{ height: '400px', objectFit: 'cover' }} // Ajustar altura y tipo de ajuste
      />
      <Carousel.Caption>
        <h3>La mejor habitacion</h3>
        <p>Con los mejores descuentos</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://static11.com-hotel.com/uploads/hotel/36897/photo/hotel-hd_15522941803.jpg"
        alt="Una experiencia unica"
        style={{ height: '400px', objectFit: 'cover' }} // Ajustar altura y tipo de ajuste
      />
      <Carousel.Caption>
        <h3>Una experiencia unica</h3>
        <p>Descubre nuestros servicios</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1020,q_auto,w_2000/hotelier-images/7f/33/acb8ffb977e6ac835f6732951eab192a3e474ae06357562cbadb05694200.jpeg"
        alt="Un lugar de descanso"
        style={{ height: '400px', objectFit: 'cover' }} // Ajustar altura y tipo de ajuste
      />
      <Carousel.Caption>
        <h3>Un lugar de descanso</h3>
        <p>Un lugar para relajarte</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);
}

export default Muestra;
