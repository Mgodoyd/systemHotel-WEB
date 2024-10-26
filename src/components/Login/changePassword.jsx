import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (!validatePassword(newPassword)) {
      setError('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
      toast.error('Contraseña no válida.');
      return;
    }

    try {
      const response = await fetch('https://hotel-gjayfhhpf9hna4eb.eastus-01.azurewebsites.net/api/v1/changePassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: newPassword }),
      });

      if (!response.ok) {
        throw new Error('Error al cambiar la contraseña');
      }

      const data = await response.json();
      setSuccess('Contraseña cambiada con éxito');
      toast.success('Contraseña cambiada con éxito');
      console.log(data);

      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Espera 2000 ms (2 segundos)

    } catch (error) {
      setError(error.message);
      toast.error(`Error: ${error.message}`);
    }
  };

  const login = () => {
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Cambiar Contraseña</h1>
      <form onSubmit={handleChangePassword} className="card p-4">
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
          <label htmlFor="newPassword" className="form-label">Nueva Contraseña:</label>
          <input
            type="password"
            id="newPassword"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Cambiar Contraseña</button>
        <br />
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}
        <button type="button" onClick={login} className="btn btn-link mt-2">
          Regresar
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
