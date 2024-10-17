import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Menu = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Mi Aplicación</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto">
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdownInicio"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Inicio
            </Link>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownInicio">
              <li><Link className="dropdown-item" to="/">Opción 1</Link></li>
              <li><Link className="dropdown-item" to="/">Opción 2</Link></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdownHabitaciones"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Habitaciones
            </Link>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownHabitaciones">
              <li><Link className="dropdown-item" to="/habitaciones">Ver Habitaciones</Link></li>
              <li><Link className="dropdown-item" to="/habitaciones/nueva">Agregar Habitación</Link></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdownReservaciones"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Reservaciones
            </Link>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownReservaciones">
              <li><Link className="dropdown-item" to="/reservaciones">Ver Reservaciones</Link></li>
              <li><Link className="dropdown-item" to="/nueva-reservacion">Nueva Reservación</Link></li>
              <li><Link className="dropdown-item" to="/cancelar-reservacion">Cancelar Reservación</Link></li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              to="#"
              id="navbarDropdownPerfil"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Perfil
            </Link>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownPerfil">
              <li><Link className="dropdown-item" to="/perfil">Ver Perfil</Link></li>
              <li><Link className="dropdown-item" to="/editar-perfil">Editar Perfil</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;

