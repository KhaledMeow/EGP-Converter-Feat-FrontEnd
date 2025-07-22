'use strict';

const React = require('react');
require('../styles/header.css');

function Header() {
  return React.createElement('header', { className: 'app-header' },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'header-content' },
        React.createElement('h1', { className: 'app-title' }, 'Currency Exchange Dashboard'),
        React.createElement('div', { className: 'last-updated' },
          React.createElement('i', { className: 'fas fa-sync-alt' }),
          ' Last updated: ',
          React.createElement('span', { id: 'last-updated-time' }, new Date().toLocaleTimeString())
        )
      )
    )
  );
}

module.exports = { default: Header };
