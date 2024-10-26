import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowClienteID = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      const token = localStorage.getItem('token');
      
      try {
        const response = await fetch('https://hotel-gjayfhhpf9hna4eb.eastus-01.azurewebsites.net/api/v1/clientes', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los clientes');
        }

        const data = await response.json();
        setClientes(data.data); // Guardar los datos de los clientes
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  if (loading) return <div>Cargando...</div>;

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Lista de Clientes</h1>
      <ToastContainer />
      {clientes.length === 0 ? (
        <div>No hay clientes disponibles.</div>
      ) : (
        <div>
          {clientes.map(cliente => (
            <div key={cliente.id} className="card m-2 p-3">
              <h5>ID: {cliente.id}</h5>
              <p>Nombre: {cliente.nombre}</p>
              <p>NIT: {cliente.nit}</p>
              <p>Teléfono: {cliente.telefono}</p>
              <p>Email: {cliente.email}</p>
              <p>Dirección: {cliente.direccion}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowClienteID;
