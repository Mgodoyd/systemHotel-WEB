import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div style={{ backgroundColor: '#00a1e4', color: "white"}}>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid justify-content-center">
          <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link mx-3" to="/Reservacion">Reservacion</Link>
          <Link className="nav-link mx-3" to="/factura/nueva">Factura</Link>
          <Link className="nav-link mx-3" to="/habitaciones">Habitaciones</Link>
          <Link className="nav-link mx-3" to="/Login">Login</Link>
          {/* Agrega más enlaces según sea necesario */}
        </div>
      </nav>
    </div>
  );
};

export default Menu;
