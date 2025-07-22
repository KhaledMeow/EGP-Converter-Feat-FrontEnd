import React from 'react';
import '../styles/header.css';

function Header() {
  return (
    <header className="app-header">
      <div className="container">
        <div className="header-content">
          <h1 className="app-title">Currency Exchange Dashboard</h1>
          <div className="last-updated">
            <i className="fas fa-sync-alt" />
            {' Last updated: '}
            <span id="last-updated-time">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
