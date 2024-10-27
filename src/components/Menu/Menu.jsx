import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();

  // Obtener los datos del localStorage
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    // Eliminar los datos del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate('/Login'); // Redirigir a la página de login
  };

  return (
    <div style={{ backgroundColor: '#00a1e4', color: "white" }}>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid justify-content-center">
          <Link className="nav-link" to="/">Home</Link>
          {token && userId && userName ? (
            <>
              <Link className="nav-link mx-3" to="/Reservacion">Reservacion</Link>
           {/* <Link className="nav-link mx-3" to="/Cliente">Cliente</Link>
              <Link className="nav-link mx-3" to="/Pruebas">Pruebas</Link> */}
              <Link className="nav-link mx-3" to="/habitaciones">Habitaciones</Link>
              <span className="navbar-text mx-3">Hola, {userName}</span>
              <button className="btn btn-outline-light mx-2" onClick={handleLogout}>
                Salir
              </button>
            </>
          ) : (
            <Link className="nav-link mx-3" to="/Login">Login</Link>
          )}
          {/* Agrega más enlaces según sea necesario */}
        </div>
      </nav>
    </div>
  );
};

export default Menu;
