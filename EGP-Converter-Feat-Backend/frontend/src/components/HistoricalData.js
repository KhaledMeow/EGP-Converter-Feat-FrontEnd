import React, { useState, useEffect, useCallback } from 'react';
import { format, subMonths } from 'date-fns';
import api from '../services/api';
import '../styles/historical.css';

function HistoricalData() {
  const [date, setDate] = useState(format(subMonths(new Date(), 1), 'yyyy-MM-dd'));
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('day');
  const [currencies] = useState(['EUR', 'USD', 'EGP', 'DZD']);
  const [selectedCurrencies, setSelectedCurrencies] = useState(['USD', 'EGP']);

  const fetchHistoricalData = useCallback(async () => {
    if (!date) return;

    setLoading(true);
    setError(null);

    try {
      let data;
      if (timeRange === 'day') {
        data = await api.getHistoricalRates(date);
      } else if (timeRange === 'month') {
        const [year, month] = date.split('-');
        data = await api.getHistoricalRatesForMonth(year, month);
      } else if (timeRange === 'year') {
        data = await api.getHistoricalRatesForYear(parseInt(date.split('-')[0]));
      }
      setHistoricalData(data);
    } catch (err) {
      setError('Failed to fetch historical data. Please try again.');
      console.error('Error fetching historical data:', err);
    } finally {
      setLoading(false);
    }
  }, [date, timeRange]);

  useEffect(() => {
    fetchHistoricalData();
  }, [fetchHistoricalData]);

  const handleCurrencyToggle = (currency) => {
    setSelectedCurrencies(prev => 
      prev.includes(currency)
        ? prev.filter(c => c !== currency)
        : [...prev, currency]
    );
  };

  const renderCurrencyFilters = () => (
    React.createElement('div', { className: 'currency-filters' },
      'Show: ',
      currencies.map(currency => (
        React.createElement('div', { key: currency, className: 'form-check form-check-inline' },
          React.createElement('input', {
            type: 'checkbox',
            className: 'form-check-input',
            id: `currency-${currency}`,
            checked: selectedCurrencies.includes(currency),
            onChange: () => handleCurrencyToggle(currency)
          }),
          React.createElement('label', { 
            className: 'form-check-label ml-1',
            htmlFor: `currency-${currency}`
          }, currency)
        )
      ))
    )
  );

  const renderDateInput = () => {
    if (timeRange === 'day') {
      return React.createElement('input', {
        type: 'date',
        className: 'form-control',
        value: date,
        onChange: (e) => setDate(e.target.value),
        max: format(new Date(), 'yyyy-MM-dd')
      });
    } else if (timeRange === 'month') {
      const currentDate = format(new Date(), 'yyyy-MM');
      return React.createElement('input', {
        type: 'month',
        className: 'form-control',
        value: date.substring(0, 7),
        onChange: (e) => setDate(e.target.value + '-01'),
        max: currentDate
      });
    } else {
      return React.createElement('input', {
        type: 'number',
        className: 'form-control',
        value: date.substring(0, 4),
        onChange: (e) => setDate(e.target.value + '-01-01'),
        min: '1999',
        max: new Date().getFullYear()
      });
    }
  };

  const renderDataTable = () => {
    if (!historicalData) return null;

    // Convert data to array and filter by selected currencies
    const dataArray = Object.entries(historicalData.rates || {})
      .map(([dataDate, rates]) => ({
        date: dataDate,
        ...Object.fromEntries(
          Object.entries(rates).filter(([currency]) => 
            selectedCurrencies.includes(currency)
          )
        )
      }));

    if (dataArray.length === 0) {
      return React.createElement('p', null, 'No data available for the selected period.');
    }

    if (timeRange === 'day') {
      return renderDailyTable(dataArray);
    } else {
      return renderTimeSeriesTable(dataArray);
    }
  };

  const renderDailyTable = (dataArray) => {
    const { timestamp } = historicalData;
    const rates = dataArray[0];
    
    return React.createElement('div', { className: 'table-responsive' },
      React.createElement('table', { className: 'table table-striped table-hover' },
        React.createElement('thead', null,
          React.createElement('tr', null,
            React.createElement('th', null, 'Currency'),
            React.createElement('th', null, 'Rate'),
            React.createElement('th', null, 'Last Updated')
          )
        ),
        React.createElement('tbody', null,
          Object.entries(rates)
            .filter(([key]) => key !== 'date' && selectedCurrencies.includes(key))
            .map(([currency, rate]) =>
              React.createElement('tr', { key: currency },
                React.createElement('td', null, currency),
                React.createElement('td', null, rate.toFixed(6)),
                React.createElement('td', null, format(new Date(timestamp * 1000), 'PPpp'))
              )
            )
        )
      )
    );
  };

  const renderTimeSeriesTable = (dataArray) => {
    return React.createElement('div', { className: 'table-responsive' },
      React.createElement('table', { className: 'table table-striped table-hover' },
        React.createElement('thead', null,
          React.createElement('tr', null,
            React.createElement('th', null, 'Date'),
            ...selectedCurrencies.map(currency => 
              React.createElement('th', { key: currency }, currency)
            )
          )
        ),
        React.createElement('tbody', null,
          dataArray.map((item, index) => {
            const { date, ...rates } = item;
            return React.createElement('tr', { key: index },
              React.createElement('td', null, format(new Date(date), 'PP')),
              ...selectedCurrencies.map(currency =>
                React.createElement('td', { key: currency },
                  rates[currency] ? rates[currency].toFixed(6) : 'N/A'
                )
              )
            );
          })
        )
      )
    );
  };

  return React.createElement('div', { className: 'card historical-card' },
    React.createElement('div', { className: 'card-header' },
      React.createElement('div', { className: 'd-flex justify-content-between align-items-center flex-wrap' },
        'Historical Exchange Rates',
        React.createElement('div', { className: 'time-range-selector' },
          React.createElement('div', { className: 'btn-group btn-group-sm', role: 'group' },
            React.createElement('button', {
              type: 'button',
              className: `btn ${timeRange === 'day' ? 'btn-primary' : 'btn-outline-secondary'}`,
              onClick: () => setTimeRange('day')
            }, 'Day'),
            React.createElement('button', {
              type: 'button',
              className: `btn ${timeRange === 'month' ? 'btn-primary' : 'btn-outline-secondary'}`,
              onClick: () => setTimeRange('month')
            }, 'Month'),
            React.createElement('button', {
              type: 'button',
              className: `btn ${timeRange === 'year' ? 'btn-primary' : 'btn-outline-secondary'}`,
              onClick: () => setTimeRange('year')
            }, 'Year')
          )
        )
      )
    ),
    React.createElement('div', { className: 'card-body' },
      React.createElement('div', { className: 'row mb-3' },
        React.createElement('div', { className: 'col-md-6' },
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', null, timeRange === 'day' ? 'Select Date' : timeRange === 'month' ? 'Select Month' : 'Select Year'),
            renderDateInput()
          )
        ),
        React.createElement('div', { className: 'col-md-6 d-flex align-items-end' },
          renderCurrencyFilters()
        )
      ),
      
      loading ? (
        React.createElement('div', { className: 'text-center py-4' },
          React.createElement('div', { className: 'spinner-border text-primary', role: 'status' },
            React.createElement('span', { className: 'sr-only' }, 'Loading...')
          )
        )
      ) : error ? (
        React.createElement('div', { className: 'alert alert-danger' }, error)
      ) : historicalData ? (
        React.createElement(React.Fragment, null,
          renderDataTable(),
          historicalData.timestamp && React.createElement('div', { className: 'last-updated text-muted text-right mt-2' },
            React.createElement('small', null, 
              `Last updated: ${new Date(historicalData.timestamp * 1000).toLocaleString()}`
            )
          )
        )
      ) : null
    )
  );
}

export default HistoricalData;
