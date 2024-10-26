import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCliente = () => {
  const [formData, setFormData] = useState({
    role: 'CLIENT',
    nombre: '',
    nit: '',
    telefono: '',
    email: '',
    direccion: '',
    password: '' // Agregar el campo de contraseña
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch('https://hotel-gjayfhhpf9hna4eb.eastus-01.azurewebsites.net/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error al crear el cliente');
      }

      const result = await response.json();
      toast.success('Cliente creado exitosamente'); // Notificación de éxito

      // Resetea el formulario si es necesario
      setFormData({
        role: 'CLIENT',
        nombre: '',
        nit: '',
        telefono: '',
        email: '',
        direccion: '',
        password: '' // Resetea la contraseña también
      });
    } catch (err) {
      toast.error(`Error: ${err.message}`); // Notificación de error
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Registro</h2>
      <form onSubmit={handleSubmit} className="card p-4">
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nit" className="form-label">NIT</label>
          <input
            type="text"
            name="nit"
            className="form-control"
            value={formData.nit}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input
            type="text"
            name="telefono"
            className="form-control"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input
            type="text"
            name="direccion"
            className="form-control"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Crear Cliente</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateCliente;
