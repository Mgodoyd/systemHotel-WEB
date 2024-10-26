import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowReservacion = () => {
  const [reservaciones, setReservaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservaciones = async () => {
      const token = localStorage.getItem('token');
      const clienteId = localStorage.getItem('userId');

      if (!token || !clienteId) {
        setError('No se encontró el token o ID del cliente. Por favor inicia sesión nuevamente.');
        navigate('/'); // Redirigir a Login si no hay token
        return;
      }

      try {
        const response = await fetch(`https://hotel-gjayfhhpf9hna4eb.eastus-01.azurewebsites.net/api/v1/reservaciones?clienteId=${clienteId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener las reservaciones');
        }

        const data = await response.json();
        setReservaciones(data.data);
        toast.success('Reservaciones cargadas con éxito'); // Mensaje de éxito al cargar
      } catch (error) {
        setError(error.message);
        toast.error(error.message); // Muestra el mensaje de error
      } finally {
        setLoading(false);
      }
    };

    fetchReservaciones();
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');

    if (window.confirm('¿Estás seguro de que quieres eliminar esta reservación?')) {
      try {
        const response = await fetch('https://hotel-gjayfhhpf9hna4eb.eastus-01.azurewebsites.net/api/v1/reservaciones', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ id }), // Enviar el ID en el cuerpo de la solicitud
        });

        if (!response.ok) {
          throw new Error('Error al eliminar la reservación');
        }

        setReservaciones((prev) => prev.filter((res) => res.id !== id)); // Actualizar el estado para eliminar la reservación de la lista
        toast.success('Reservación eliminada con éxito'); // Mensaje de éxito al eliminar
      } catch (error) {
        setError(error.message);
        toast.error(error.message); // Muestra el mensaje de error
      }
    }
  };

  if (loading) return <div>Cargando...</div>;

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (reservaciones.length === 0) {
    return <div>No hay reservaciones disponibles.</div>;
  }

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h1 className="text-center">Lista de Reservaciones</h1>
      <div className="d-flex flex-wrap justify-content-start">
        {reservaciones.map((reservacion) => (
          <div key={reservacion.id} className="card reservacion-card m-2" style={{ minWidth: '300px', flex: '1 1 auto' }}>
            <div className="card-body">
              <h5>ID de Reservación: {reservacion.id}</h5>
              <h6>Cliente:</h6>
              <p>ID: {reservacion.cliente.id}</p>
              <p>Nombre: {reservacion.cliente.nombre}</p>
              <p>NIT: {reservacion.cliente.nit}</p>
              <h6>Habitación:</h6>
              <p>ID: {reservacion.habitacion.id}</p>
              <p>Número: {reservacion.habitacion.numero}</p>
              <p>Tipo: {reservacion.habitacion.tipo}</p>
              <h6>Fechas:</h6>
              <p>Fecha de Entrada: {new Date(reservacion.fecha_entrada).toLocaleString()}</p>
              <p>Fecha de Salida: {new Date(reservacion.fecha_salida).toLocaleString()}</p>
              <h6>Estado:</h6>
              <p>{reservacion.estado}</p>
              <h6>Servicios:</h6>
              <ul>
                {reservacion.servicios.length > 0 ? (
                  reservacion.servicios.map((servicio, index) => (
                    <li key={index}>{servicio.nombre}</li>
                  ))
                ) : (
                  <li>No hay servicios adicionales.</li>
                )}
              </ul>
              <h6>Facturas:</h6>
              <ul>
                {reservacion.facturas.length > 0 ? (
                  reservacion.facturas.map((factura, index) => (
                    <li key={index}>{factura}</li>
                  ))
                ) : (
                  <li>No hay facturas asociadas.</li>
                )}
              </ul>
              <div className="d-flex justify-content-between mt-3">
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleDelete(reservacion.id)}
                >
                  Eliminar
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={() => navigate(`/Agregar/servicio/${reservacion.id}`)}
                >
                  Agregar Servicio
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowReservacion;
