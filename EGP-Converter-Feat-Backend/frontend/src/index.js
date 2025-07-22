'use strict';

const React = require('react');
const ReactDOM = require('react-dom/client');
const Header = require('./components/Header').default;
const CurrencyConverter = require('./components/CurrencyConverter').default;
const ExchangeRates = require('./components/ExchangeRates').default;
const HistoricalData = require('./components/HistoricalData').default;

require('./styles/main.css');

function App() {
  return React.createElement('div', { className: 'app' },
    React.createElement(Header, null),
    React.createElement('main', { className: 'main-content' },
      React.createElement('div', { className: 'container' },
        React.createElement('div', { className: 'row' },
          React.createElement('div', { className: 'col-md-6' },
            React.createElement(CurrencyConverter, null)
          ),
          React.createElement('div', { className: 'col-md-6' },
            React.createElement(ExchangeRates, null)
          )
        ),
        React.createElement('div', { className: 'row mt-4' },
          React.createElement('div', { className: 'col-12' },
            React.createElement(HistoricalData, null)
          )
        )
      )
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
