import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Contacto.css'; // Importa el archivo CSS para estilos

const Contacto = () => {
  return (
    <div className="contacto-container">
      <h2>Contáctanos</h2>
      <div className="contacto-info">
        <div className="contact-item">
          <FaPhone className="contact-icon" />
          <span>+502 55884129</span>
        </div>
        <div className="contact-item">
          <FaEnvelope className="contact-icon" />
          <span>hotelgrupo3@gmail.com</span>
        </div>
      </div>
      <div className="social-media">
        <div className="social-icons">
          <a className="facebook" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a className="twitter" href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a className="instagram" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
