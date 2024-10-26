import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CreateReservacion = () => {
  const { id } = useParams(); // Extraer el ID de la habitación
  const [clienteId, setClienteId] = useState(''); // Estado para el ID del cliente
  const [fechaEntrada, setFechaEntrada] = useState(''); // Estado para la fecha de entrada
  const [fechaSalida, setFechaSalida] = useState(''); // Estado para la fecha de salida
  const [estado] = useState('reservado'); // Estado para el estado de la reservación (predeterminado)
  const [error, setError] = useState(null); // Estado para errores
  const [success, setSuccess] = useState(null); // Estado para mensajes de éxito

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem('token'); // Obtener el token JWT
    const Id = localStorage.getItem('userId');

    try {
      const response = await fetch('https://hotel-gjayfhhpf9hna4eb.eastus-01.azurewebsites.net/api/v1/reservaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Incluir el token en la cabecera
        },
        body: JSON.stringify({
          cliente: { id: clienteId }, // Usar el ID del cliente
          habitacion: { id }, // Usar el ID de la habitación de los parámetros de la URL
          fecha_entrada: fechaEntrada,
          fecha_salida: fechaSalida,
          estado, // Estado predeterminado
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la reservación');
      }

      const data = await response.json();
      setSuccess('Reservación creada con éxito');
      console.log(data); // Verifica la respuesta de la API

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Crear Reservación</h1>
      <form onSubmit={handleSubmit} className="card p-4">
        <div className="mb-3">
          <label htmlFor="clienteId" className="form-label">ID del Cliente:</label>
          <input
            type="text"
            id="clienteId"
            className="form-control"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fechaEntrada" className="form-label">Fecha de Entrada:</label>
          <input
            type="datetime-local"
            id="fechaEntrada"
            className="form-control"
            value={fechaEntrada}
            onChange={(e) => setFechaEntrada(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fechaSalida" className="form-label">Fecha de Salida:</label>
          <input
            type="datetime-local"
            id="fechaSalida"
            className="form-control"
            value={fechaSalida}
            onChange={(e) => setFechaSalida(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Crear Reservación</button>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}
      </form>
    </div>
  );
};

export default CreateReservacion;