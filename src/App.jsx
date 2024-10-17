import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ShowHabitacion from './components/showHabitacion';
import Menu from './components/Menu'; // Asegúrate de importar el componente Menu

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/habitaciones" element={<ShowHabitacion />} />
      </Routes>
    </Router>
  );
}

export default App;
