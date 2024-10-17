import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap aquí
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
        console.log(data.data);
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
    return (
      <div>
        <div>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1>Habitaciones</h1>
      <table className="table">
        <thead className="thead-dark"class="bg-primary">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Número</th>
            <th scope="col">Tipo</th>
            <th scope="col">Descripción</th>
            <th scope="col">Precio</th>
            <th scope="col">Hotel ID</th>
            <th scope="col">Promociones</th>
          </tr>
        </thead>
        <tbody>
          {habitaciones.map((habitacion, index) => (
            <tr key={habitacion.id}>
              <th scope="row">{index + 1}</th>
              <td>{habitacion.numero}</td>
              <td>{habitacion.tipo}</td>
              <td>{habitacion.descripcion}</td>
              <td>{habitacion.precio.toFixed(2)}€</td>
              <td>{habitacion.hotel.id}</td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowHabitacion;
