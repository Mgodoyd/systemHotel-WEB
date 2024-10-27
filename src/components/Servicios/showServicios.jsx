import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowServicios = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServicios = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No se encontró el token. Por favor inicia sesión nuevamente.');
        navigate('/'); // Redirigir a Login si no hay token
        return;
      }

      try {
        const response = await fetch('https://hotel-gjayfhhpf9hna4eb.eastus-01.azurewebsites.net/api/v1/servicios', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const text = await response.text();
        console.log('Respuesta de la API:', text); // Muestra el texto de la respuesta

        const data = JSON.parse(text);

        if (data.status === "OK") {
          setServicios(data.data);
          toast.success('Servicios cargados con éxito');
        } else {
          throw new Error(data.message || 'Error desconocido');
        }
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServicios();
  }, [navigate]);

  if (loading) return <div>Cargando...</div>;

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (servicios.length === 0) {
    return <div>No hay servicios disponibles.</div>;
  }

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h1 className="text-center">Lista de Servicios</h1>
      <ul className="list-group mt-4">
        {servicios.map((servicio) => (
          <li key={servicio.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div >
              <h5>{servicio.nombre}</h5>
              <p>{servicio.descripcion}</p>
              <p>Precio: ${servicio.precio}</p>
              <p>Fecha de Reservación: {new Date(servicio.reservacion.fecha_reservacion).toLocaleString()}</p>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => navigate(`/AgregarServicio/${servicio.id}`)} // Cambia esta ruta según sea necesario
            >
              Agregar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowServicios;
