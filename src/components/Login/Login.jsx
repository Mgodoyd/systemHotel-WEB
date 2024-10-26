import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://hotel-gjayfhhpf9hna4eb.eastus-01.azurewebsites.net/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }

      const data = await response.json();
      const token = data.data.jwt;

      // Decodificar el token
      const decodedToken = jwtDecode(token);
      const { id, name } = decodedToken;

      // Guardar el token, id y nombre en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', id);
      localStorage.setItem('userName', name);
      console.log(id);

      toast.success('Inicio de sesión exitoso'); // Notificación de éxito

      // Usar setTimeout para esperar antes de redirigir
      setTimeout(() => {
        navigate('/'); // Redirige al menú
      }, 2000); // 2000 ms = 2 segundos

    } catch (error) {
      setError(error.message);
      toast.error(`Error: ${error.message}`); // Notificación de error
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = () => {
    navigate('/Login/Editar'); // Redirige al componente de cambiar contraseña
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Iniciar Sesión</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="card p-4">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña:</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
            <button type="button" onClick={handleChangePassword} className="btn btn-link mt-2">
              Recuperar Contraseña
            </button>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
