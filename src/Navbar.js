import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [exchangeRates, setExchangeRates] = useState(null);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleExchangeRatesClick = async () => {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/4e5d1c84b5f28f8d20f68278/latest/USD`);

      const data = await response.json();
      setExchangeRates(data.conversion_rates);
      alert("Exchange rates loaded! Check the console.");
      console.log(data.conversion_rates);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-icon" onClick={toggleMenu}>
          &#9776;
        </button>
        <div className="navbar-title">Loan Calculator</div>
      </div>

      <div className={`navbar-links ${menuOpen ? 'show' : ''}`}>
        <a href="#" className="nav-link">Home</a>
        <a href="#" className="nav-link" onClick={handleExchangeRatesClick}>Exchange Rates (Live)</a>
        <a href="#" className="nav-link">About</a>
        <a href="#" className="nav-link">Error Page</a>

        <label className="toggle-switch">
          <input type="checkbox" onChange={handleToggle} checked={isDarkMode} />
          <span className="slider round"></span>
        </label>
      </div>
    </nav>
  );
};

export default Navbar;
