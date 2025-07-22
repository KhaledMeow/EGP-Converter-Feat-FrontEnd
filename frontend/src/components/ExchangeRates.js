import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import '../styles/rates.css';

function ExchangeRates() {
  const [baseCurrency, setBaseCurrency] = useState('EUR');
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState('');
  const [currencies] = useState(['EUR', 'USD', 'EGP', 'DZD']);

  const fetchExchangeRates = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await api.getLatestRates(baseCurrency);
      setRates(data.rates);
      setLastUpdated(new Date(data.timestamp * 1000).toLocaleString());
    } catch (err) {
      setError('Failed to fetch exchange rates. Please try again.');
      console.error('Error fetching rates:', err);
    } finally {
      setLoading(false);
    }
  }, [baseCurrency]);

  useEffect(() => {
    fetchExchangeRates();
  }, [fetchExchangeRates]);

  return React.createElement('div', { className: 'card rates-card' },
    React.createElement('div', { className: 'card-header' },
      React.createElement('div', { className: 'd-flex justify-content-between align-items-center' },
        'Exchange Rates',
        React.createElement('div', { className: 'base-currency-selector' },
          React.createElement('span', { className: 'mr-2' }, 'Base Currency:'),
          React.createElement('select', {
            className: 'form-control form-control-sm',
            value: baseCurrency,
            onChange: (e) => setBaseCurrency(e.target.value),
            disabled: loading
          },
            currencies.map(currency => 
              React.createElement('option', { key: currency, value: currency }, currency)
            )
          )
        )
      )
    ),
    React.createElement('div', { className: 'card-body' },
      loading ? (
        React.createElement('div', { className: 'text-center py-4' },
          React.createElement('div', { className: 'spinner-border text-primary', role: 'status' },
            React.createElement('span', { className: 'sr-only' }, 'Loading...')
          )
        )
      ) : error ? (
        React.createElement('div', { className: 'alert alert-danger' }, error)
      ) : (
        React.createElement(React.Fragment, null,
          React.createElement('div', { className: 'table-responsive' },
            React.createElement('table', { className: 'table table-striped' },
              React.createElement('thead', null,
                React.createElement('tr', null,
                  React.createElement('th', null, 'Currency'),
                  React.createElement('th', { className: 'text-right' }, 'Rate')
                )
              ),
              React.createElement('tbody', null,
                Object.entries(rates).map(([currency, rate]) => (
                  React.createElement('tr', { key: currency },
                    React.createElement('td', null, currency),
                    React.createElement('td', { className: 'text-right' },
                      React.createElement('span', { className: 'rate-value' }, rate.toFixed(6)),
                      ' ',
                      React.createElement('span', { className: 'text-muted' },
                        `(1 ${baseCurrency} = ${rate.toFixed(6)} ${currency})`
                      )
                    )
                  )
                ))
              )
            )
          ),
          lastUpdated && React.createElement('div', { className: 'last-updated text-muted text-right mt-2' },
            React.createElement('small', null, `Last updated: ${lastUpdated}`)
          )
        )
      )
    )
  );
}

export default ExchangeRates;
