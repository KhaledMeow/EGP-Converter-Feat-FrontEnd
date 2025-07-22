import React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header';
import CurrencyConverter from './components/CurrencyConverter';
import ExchangeRates from './components/ExchangeRates';
import HistoricalData from './components/HistoricalData';
import './styles/main.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <CurrencyConverter />
            </div>
            <div className="col-md-6">
              <ExchangeRates />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <HistoricalData />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
