import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AgregarServicio = () => {
  const { id } = useParams(); // Obtener el ID de la reservación
  const [nombre, setNombre] = useState(''); // Estado para el nombre del servicio
  const [descripcion, setDescripcion] = useState(''); // Estado para la descripción del servicio
  const [precio, setPrecio] = useState(''); // Estado para el precio del servicio
  const [error, setError] = useState(null); // Estado para errores
  const [success, setSuccess] = useState(null); // Estado para mensajes de éxito

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem('token'); // Obtener el token JWT

    try {
      const response = await fetch('https://hotel-gjayfhhpf9hna4eb.eastus-01.azurewebsites.net/api/v1/servicios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Incluir el token en la cabecera
        },
        body: JSON.stringify({
          reservacion: { id }, // Usar el ID de la reservación de los parámetros de la URL
          nombre,
          descripcion,
          precio: parseFloat(precio), // Convertir el precio a número
        }),
      });

      if (!response.ok) {
        throw new Error('Error al agregar el servicio');
      }

      const data = await response.json();
      setSuccess('Servicio agregado con éxito');
      console.log(data); // Verifica la respuesta de la API

      // Limpiar los campos después de agregar el servicio
      setNombre('');
      setDescripcion('');
      setPrecio('');

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Agregar Servicio</h1>
      <form onSubmit={handleSubmit} className="card p-4">
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre del Servicio:</label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción:</label>
          <textarea
            id="descripcion"
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">Precio:</label>
          <input
            type="number"
            id="precio"
            className="form-control"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Agregar Servicio</button>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}
      </form>
    </div>
  );
};

export default AgregarServicio;
