import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowHabitacion = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const response = await fetch('https://hotel-gjayfhhpf9hna4eb.eastus-01.azurewebsites.net/api/v1/habitaciones', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const responseText = await response.text();
        console.log(responseText); // Imprimir la respuesta en crudo

        // Intentar convertir a JSON
        try {
          const data = JSON.parse(responseText);
          console.log(data); // Verifica la estructura del JSON

          if (Array.isArray(data.data)) {
            setHabitaciones(data.data);
            toast.success('Habitaciones cargadas con éxito!');
          } else {
            throw new Error('Los datos no son un array válido');
          }
        } catch (parseError) {
          console.error('Error al analizar JSON:', parseError);
          setError('Error al analizar la respuesta de la API.');
          toast.error('Error al analizar la respuesta de la API.');
        }
      } catch (error) {
        setError(error.message);
        toast.error(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchHabitaciones();
  }, [navigate]);

  const handleReservar = (habitacionId) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      setShowLoginPrompt(true);
    } else {
      navigate(`/reservacion/nueva/${habitacionId}`);
      toast.info('Redirigiendo a la reserva...');
    }
  };

  const handleConfirmLogin = () => {
    setShowLoginPrompt(false);
    navigate('/login');
  };

  const handleCancelLogin = () => {
    setShowLoginPrompt(false);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-5 d-flex flex-column">
      <ToastContainer />
      <div className="row flex-grow-1">
        {habitaciones.map((habitacion) => (
          <div className="col-md-4 mb-4" key={habitacion.id}>
            <div className="card">
              <img src={habitacion.imagen} className="card-img-top" alt={`Habitación ${habitacion.numero}`} />
              <div className="card-body">
                <h5 className="card-title">Habitación {habitacion.numero}</h5>
                <p className="card-text"><strong>Tipo:</strong> {habitacion.tipo}</p>
                <p className="card-text"><strong>Descripción:</strong> {habitacion.descripcion}</p>
                <p className="card-text"><strong>Precio:</strong> {habitacion.precio.toFixed(2)}$</p>
                <p className="card-text"><strong>Promociones:</strong></p>
                {Array.isArray(habitacion.promociones) && habitacion.promociones.length > 0 ? (
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
                <div className="d-flex justify-content-between mt-3">
                  <button 
                    className="btn btn-primary" 
                    onClick={() => handleReservar(habitacion.id)}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showLoginPrompt && (
        <div className="modal" style={{ display: 'block', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-content" style={{ margin: 'auto', padding: '20px', backgroundColor: 'white', borderRadius: '5px' }}>
            <h5>Necesitas iniciar sesión</h5>
            <p>¿Quieres ir a la página de inicio de sesión?</p>
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary" onClick={handleConfirmLogin}>Sí</button>
              <button className="btn btn-secondary" onClick={handleCancelLogin}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowHabitacion;

