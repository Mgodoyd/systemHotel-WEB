import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Testimonios = () => {
  const clientes = [
    {
      nombre: 'Juan Pérez',
      comentario: '¡Tuve una estancia maravillosa! El servicio fue excelente y las instalaciones son de primera.',
      foto: 'https://thumbs.dreamstime.com/b/hombre-satisfecho-imagen-de-fondo-blanco-178686458.jpg', // Reemplaza con la URL de la foto del cliente
    },
    {
      nombre: 'María López',
      comentario: 'El hotel superó mis expectativas. Definitivamente volveré.',
      foto: 'https://media.istockphoto.com/id/1289220545/es/foto/hermosa-mujer-sonriendo-con-los-brazos-cruzados.jpg?s=612x612&w=0&k=20&c=bgvI9eiFPdRglO1s7mMW7xC-Kut4LOsehzjrCcrMLx8=',
    },
    {
      nombre: 'Carla Gómez',
      comentario: 'Un lugar perfecto para descansar. ¡Recomendado al 100%!',
      foto: 'https://pymstatic.com/5844/conversions/personas-emocionales-wide_webp.webp',
    },
  ];

  return (
    <Carousel>
      {clientes.map((cliente, index) => (
        <Carousel.Item key={index}>
          <div className="d-flex align-items-center" style={{ height: '400px' }}>
            <img
              src={cliente.foto}
              alt={cliente.nombre}
              style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '20px' }}
            />
            <div>
              <h5>{cliente.nombre}</h5>
              <p>"{cliente.comentario}"</p>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Testimonios;
