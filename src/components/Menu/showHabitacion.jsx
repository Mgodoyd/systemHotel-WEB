import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShowHabitacion = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabitaciones = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No se encontró el token. Por favor inicia sesión nuevamente.');
        navigate('/'); // Redirigir a Login si no hay token
        return;
      }

      try {
        const response = await fetch('https://hotel-gjayfhhpf9hna4eb.eastus-01.azurewebsites.net/api/v1/habitaciones', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al obtener datos');
        }

        const data = await response.json();
        setHabitaciones(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHabitaciones();
  }, [navigate]);

  if (loading) return <div>Cargando...</div>;

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
<div className="container mt-5 d-flex flex-column">
      {/* Menú centrado */}
      <nav className="navbar navbar-dark bg-primary mb-4">
        <ul className="navbar-nav mx-auto d-flex flex-row">
          <li className="nav-item mx-3"><a className="nav-link text-white" href="#">Inicio</a></li>
          <li className="nav-item mx-3"><a className="nav-link text-white" href="#">Habitaciones</a></li>
          <li className="nav-item mx-3"><a className="nav-link text-white" href="#">Servicios</a></li>
          <li className="nav-item mx-3"><a className="nav-link text-white" href="#">Promociones</a></li>
          <li className="nav-item mx-3"><a className="nav-link text-white" href="#">Contacto</a></li>
        </ul>
      </nav>

      {/* Contenido de habitaciones */}
      <div className="row flex-grow-1">
        {habitaciones.map((habitacion, index) => (
          <div className="col-md-4 mb-4" key={habitacion.id}>
            <div className="card">
              <img src={habitacion.imagen} className="card-img-top" alt={`Habitación ${habitacion.numero}`} />
              <div className="card-body">
                <h5 className="card-title">Habitación {habitacion.numero}</h5>
                <p className="card-text"><strong>Tipo:</strong> {habitacion.tipo}</p>
                <p className="card-text"><strong>Descripción:</strong> {habitacion.descripcion}</p>
                <p className="card-text"><strong>Precio:</strong> {habitacion.precio.toFixed(2)}€</p>
                <p className="card-text"><strong>Promociones:</strong></p>
                {habitacion.promociones.length > 0 ? (
                  <ul>
                    {habitacion.promociones.map(promocion => (
                      <li key={promocion.id}>
                        {promocion.descripcion} - {promocion.servicio.nombre} ({promocion.tipo_servicio})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span>No hay promociones</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pie de página */}
      <footer className="bg-light text-center p-4">
        <p>© 2024 Mi Hotel. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default ShowHabitacion;
