const React = require('react');
const { useState } = React;
const api = require('../services/api');
require('../styles/converter.css');

function CurrencyConverter() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currencies] = useState(['EUR', 'USD', 'EGP', 'DZD']);

  const convertCurrency = async () => {
    if (!amount || isNaN(amount)) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const converted = await api.convertCurrency(amount, fromCurrency, toCurrency);
      setResult(converted);
    } catch (err) {
      setError('Failed to convert currency. Please try again.');
      console.error('Conversion error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    convertCurrency();
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return React.createElement('div', { className: 'card converter-card' },
    React.createElement('div', { className: 'card-header' }, 'Currency Converter'),
    React.createElement('div', { className: 'card-body' },
      React.createElement('form', { onSubmit: handleSubmit },
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { htmlFor: 'amount' }, 'Amount'),
          React.createElement('input', {
            type: 'number',
            className: 'form-control',
            id: 'amount',
            value: amount,
            onChange: (e) => setAmount(e.target.value),
            min: '0.01',
            step: '0.01',
            required: true
          })
        ),
        
        React.createElement('div', { className: 'currency-selectors' },
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { htmlFor: 'from-currency' }, 'From'),
            React.createElement('select', {
              className: 'form-control',
              id: 'from-currency',
              value: fromCurrency,
              onChange: (e) => setFromCurrency(e.target.value)
            },
              currencies.map(currency => 
                React.createElement('option', { key: currency, value: currency }, currency)
              )
            )
          ),
          
          React.createElement('button', {
            type: 'button',
            className: 'swap-btn',
            onClick: swapCurrencies,
            title: 'Swap currencies'
          },
            React.createElement('i', { className: 'fas fa-exchange-alt' })
          ),
          
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { htmlFor: 'to-currency' }, 'To'),
            React.createElement('select', {
              className: 'form-control',
              id: 'to-currency',
              value: toCurrency,
              onChange: (e) => setToCurrency(e.target.value)
            },
              currencies
                .filter(currency => currency !== fromCurrency)
                .map(currency => 
                  React.createElement('option', { key: currency, value: currency }, currency)
                )
            )
          )
        ),
        
        React.createElement('button', {
          type: 'submit',
          className: 'btn btn-primary btn-block',
          disabled: loading
        },
          loading ? 'Converting...' : 'Convert'
        )
      ),
      
      result && React.createElement('div', { className: 'conversion-result' },
        React.createElement('h3', null, 'Result'),
        React.createElement('p', null,
          React.createElement('span', { className: 'amount' }, amount),
          ' ',
          React.createElement('span', { className: 'currency' }, fromCurrency),
          ' = ',
          React.createElement('span', { className: 'result-amount' }, result.toFixed(4)),
          ' ',
          React.createElement('span', { className: 'currency' }, toCurrency)
        )
      ),
      
      error && React.createElement('div', { className: 'alert alert-danger mt-3' },
        error
      )
    )
  );
}

module.exports = { default: CurrencyConverter };
