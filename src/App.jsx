import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Cliente from './components/Clientes/Cliente';
import Pruebas from './components/Menu/Pruebas';
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
import Habitaciones from './components/Menu/Habitaciones';

// Componentes para Reservaciones //
import CrearReservacion from './components/Reservacion/createReservacion';
import EliminarReservacion from './components/Reservacion/deleteReservacion';
import MostrarReservacion from './components/Reservacion/showReservacion';
import MostrarReservacionID from './components/Reservacion/showReservacionID';
import ActualizarReservacion from './components/Reservacion/updateReservacion';

// Componentes para Servicios //
import AgregarServicio from './components/Servicios/AgregarServicio';
import MostrarServicios from './components/Servicios/showServicios';
import MostrarServiciosID from './components/Servicios/showServiciosID';
  // Parqueo //
  import AgregarParqueo from './components/Servicios/Parqueo/createParqueo';
  // Servicio Habitacion //
  import AgregarServicioHabitacion from './components/Servicios/ServicioHabitacion/createServicioHabitacion';
  // Uso Habitacion //
  import AgregarUsoHabitacion from './components/Servicios/UsoHabitacion/createUsoHabitacion';

import Inicio from './components/HOME/Inicio';
import ShowClienteID from './components/Clientes/showClienteID';
 
function App() {
  return (
    <Router>
    <div>
      <Menu /> {/* Componente de menú aquí */}
      <div className="container" style={{ padding: '20px' }}>
        {/* Este es el contenedor donde se renderizan los componentes según la ruta */}
        <Routes>
          <Route path="/" element={<Inicio></Inicio>} />
          <Route path="/Pruebas" element={<Pruebas></Pruebas>} />

          <Route path="/Cliente" element={<Cliente />} />
          <Route path="/Cliente/Nuevo" element={<CrearCliente />} />
          <Route path="/Cliente/Eliminar" element={<EliminarCliente />} />
          <Route path="/Cliente" element={<MostrarClienteID />} />
          <Route path="/Cliente/Editar" element={<ActualizarCliente />} />
          <Route path="/Factura/Nueva" element={<CrearFactura />} />
          <Route path="/Factura/MostrarID" element={<MostrarFacturaID />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Login/Editar" element={<EditarLogin />} />
          <Route path="/habitaciones" element={<Habitaciones />} />
          <Route path="/reservacion/nueva/:id" element={<CrearReservacion />} />
          <Route path="/Reservacion/Eliminar" element={<EliminarReservacion />} />
          <Route path="/Reservacion" element={<MostrarReservacion />} />
          <Route path="/Reservacion/ID" element={<ShowClienteID />} />
          <Route path="/Reservacion/Editar" element={<ActualizarReservacion />} />

      
          <Route path="/Agregar/servicio/:id" element={<AgregarServicio/>} />
          <Route path="/Servicio/servicio" element={<MostrarServicios />} />
          <Route path="/Servicio/ID" element={<MostrarServiciosID />} />
          <Route path="/Servicio/Parqueo/Nuevo" element={<AgregarParqueo />} />
          <Route path="/Servicio/Habitacion/Nuevo" element={<AgregarServicioHabitacion />} />
          <Route path="/Servicio/Uso/Nuevo" element={<AgregarUsoHabitacion />} />
        </Routes>
      </div> {/* Fin del contenedor */}
    </div>
  </Router>
);
}

export default App;
