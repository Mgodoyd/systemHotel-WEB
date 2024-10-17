import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

// Componentes para Clientes //
import CrearCliente from './components/Clientes/createCliente';
import EliminarCliente from './components/Clientes/deleteCliente';
import MostrarClienteID from './components/Clientes/showClienteID';
import ActualizarCliente from './components/Clientes/updateCliente';

// Componentes para Factura //
import CrearFactura from './components/Factura/createFactura';
import MostrarFacturaID from './components/Factura/showFacturaID';

// Componentes para Login //
import Login from './components/Login/Login';
import EditarLogin from './components/Login/changePassword';

// Componentes para Menu //
import Menu from './components/Menu/Menu';
import Habitaciones from './components/Menu/showHabitacion';

// Componentes para Reservaciones //
import CrearReservacion from './components/Reservacion/createReservacion';
import EliminarReservacion from './components/Reservacion/deleteReservacion';
import MostrarReservacion from './components/Reservacion/showReservacion';
import MostrarReservacionID from './components/Reservacion/showReservacionID';
import ActualizarReservacion from './components/Reservacion/updateReservacion';

// Componentes para Servicios //
import MostrarServicios from './components/Servicios/showServicios';
import MostrarServiciosID from './components/Servicios/showServiciosID';
  // Parqueo //
  import AgregarParqueo from './components/Servicios/Parqueo/createParqueo';
  // Servicio Habitacion //
  import AgregarServicioHabitacion from './components/Servicios/ServicioHabitacion/createServicioHabitacion';
  // Uso Habitacion //
  import AgregarUsoHabitacion from './components/Servicios/UsoHabitacion/createUsoHabitacion';


 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/Cliente/Nuevo" element={<CrearCliente />} />
        <Route path="/Cliente/Eliminar" element={<EliminarCliente />} />
        <Route path="/Cliente" element={<MostrarClienteID />} />
        <Route path="/Cliente/Editar" element={<ActualizarCliente />} />
        
        <Route path="/Factura/Nueva" element={<CrearFactura />} />
        <Route path="/Factura/MostrarID" element={<MostrarFacturaID />} />

        <Route path="/Login" element={<Login />} />
        <Route path="/Login/Editar" element={<EditarLogin />} />

        <Route path="/Menu" element={<Menu />} />
        <Route path="/Habitaciones" element={<Habitaciones />} />

        <Route path="/Reservacion/Nueva" element={<CrearReservacion />} />
        <Route path="/Reservacion/Eliminar" element={<EliminarReservacion />} />
        <Route path="/Reservacion" element={<MostrarReservacion />} />
        <Route path="/Reservacion/ID" element={<MostrarReservacionID />} />
        <Route path="/Reservacion/Editar" element={<ActualizarReservacion />} />

        <Route path="/Servicio/servicio" element={<MostrarServicios />} />
        <Route path="/Servicio/ID" element={<MostrarServiciosID />} />
        <Route path="/Servicio/Parqueo/Nuevo" element={<AgregarParqueo />} />
        <Route path="/Servicio/Habitacion/Nuevo" element={<AgregarServicioHabitacion />} />
        <Route path="/Servicio/Uso/Nuevo" element={<AgregarUsoHabitacion />} />
      
      </Routes>
    </Router>
  );
}

export default App;
