
import React, { useEffect } from 'react';

const Pruebas = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservaciones = async () => {
      const token = localStorage.getItem('token'); // Asegúrate de que el token esté presente
      const endpoint = 'https://hotel-gjayfhhpf9hna4eb.eastus-01.azurewebsites.net/api/v1/puestos'; // Define tu endpoint

      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // Comprobar si la respuesta es correcta
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }

        const result = await response.json(); // Convertir la respuesta a JSON
        setData(result); // Guardar el objeto completo en el estado
      } catch (error) {
        setError(error.message); // Guardar el mensaje de error
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    fetchReservaciones();
  }, []);

  if (loading) return <div>Cargando datos...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Datos de Reservaciones</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Muestra el objeto completo en un formato legible */}
    </div>
  );
};

export default Pruebas;