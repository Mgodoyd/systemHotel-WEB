import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowHabitacion = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHabitacion, setSelectedHabitacion] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [habitacionToReserve, setHabitacionToReserve] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        const response = await fetch('https://hotel-gjayfhhpf9hna4eb.eastus-01.azurewebsites.net/api/v1/habitaciones', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al obtener datos');
        }

        const data = await response.json();
        setHabitaciones(data.data);
        toast.success('Habitaciones cargadas con éxito!'); // Mensaje de éxito
      } catch (error) {
        setError(error.message);
        toast.error(`Error: ${error.message}`); // Mensaje de error
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
      setHabitacionToReserve(habitacionId);
      setShowLoginPrompt(true); // Mostrar modal de confirmación
    } else {
      navigate(`/reservacion/nueva/${habitacionId}`);
      toast.info('Redirigiendo a la reserva...'); // Mensaje al navegar
    }
  };

  const handleConfirmLogin = () => {
    setShowLoginPrompt(false);
    navigate('/login'); // Redirigir al login
  };

  const handleCancelLogin = () => {
    setShowLoginPrompt(false);
  };

  const handleVer = (habitacion) => {
    setSelectedHabitacion(habitacion);
  };

  const handleCloseModal = () => {
    setSelectedHabitacion(null);
  };

  if (loading) return <div>Cargando...</div>;

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                <div className="d-flex justify-content-between mt-3">
                  <button 
                    className="btn btn-primary" 
                    onClick={() => handleReservar(habitacion.id)}
                  >
                    Reservar
                  </button>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => handleVer(habitacion)}
                  >
                    Ver
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedHabitacion && (
        <div className="modal" style={{ display: 'block', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-content" style={{ margin: 'auto', padding: '20px', backgroundColor: 'white', borderRadius: '5px' }}>
            <span onClick={handleCloseModal} style={{ cursor: 'pointer', float: 'right', fontSize: '20px' }}>&times;</span>
            <img src={selectedHabitacion.imagen} alt={`Habitación ${selectedHabitacion.numero}`} style={{ width: '100%', height: 'auto' }} />
            <h5>{selectedHabitacion.descripcion}</h5>
          </div>
        </div>
      )}

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
