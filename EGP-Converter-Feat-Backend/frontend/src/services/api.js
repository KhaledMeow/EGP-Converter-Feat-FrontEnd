const axios = require('axios');

// Base URL from environment variables or default to local development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = {
  /**
   * Convert currency from one to another
   * @param {number} amount - Amount to convert
   * @param {string} from - Source currency code (e.g., 'USD')
   * @param {string} to - Target currency code (e.g., 'EUR')
   * @returns {Promise<number>} - Converted amount
   */
  async convertCurrency(amount, from, to) {
    try {
      const response = await axios.get(`${API_BASE_URL}/convert`, {
        params: { amount, from, to }
      });
      return response.data.result;
    } catch (error) {
      console.error('Error converting currency:', error);
      throw error;
    }
  },

  /**
   * Get the latest exchange rates
   * @param {string} base - Base currency (default: 'EUR')
   * @returns {Promise<Object>} - Latest exchange rates
   */
  async getLatestRates(base = 'EUR') {
    try {
      const response = await axios.get(`${API_BASE_URL}/latest`, {
        params: { base }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching latest rates:', error);
      throw error;
    }
  },

  /**
   * Get historical exchange rates for a specific date
   * @param {string} date - Date in YYYY-MM-DD format
   * @param {string} base - Base currency (default: 'EUR')
   * @returns {Promise<Object>} - Historical exchange rates for the date
   */
  async getHistoricalRates(date, base = 'EUR') {
    try {
      const response = await axios.get(`${API_BASE_URL}/historical`, {
        params: { date, base }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching historical rates:', error);
      throw error;
    }
  },

  /**
   * Get historical exchange rates for a specific month
   * @param {number} year - Year (e.g., 2023)
   * @param {number} month - Month (1-12)
   * @param {string} base - Base currency (default: 'EUR')
   * @returns {Promise<Object>} - Historical exchange rates for the month
   */
  async getHistoricalRatesForMonth(year, month, base = 'EUR') {
    try {
      const response = await axios.get(`${API_BASE_URL}/historical/month`, {
        params: { year, month, base }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching monthly historical rates:', error);
      throw error;
    }
  },

  /**
   * Get historical exchange rates for a specific year
   * @param {number} year - Year (e.g., 2023)
   * @param {string} base - Base currency (default: 'EUR')
   * @returns {Promise<Object>} - Historical exchange rates for the year
   */
  async getHistoricalRatesForYear(year, base = 'EUR') {
    try {
      const response = await axios.get(`${API_BASE_URL}/historical/year`, {
        params: { year, base }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching yearly historical rates:', error);
      throw error;
    }
  },

  /**
   * Get available currencies
   * @returns {Promise<Array>} - List of available currency codes
   */
  async getAvailableCurrencies() {
    try {
      const response = await axios.get(`${API_BASE_URL}/currencies`);
      return response.data.currencies || ['EUR', 'USD', 'EGP', 'DZD'];
    } catch (error) {
      console.error('Error fetching available currencies, using default set:', error);
      return ['EUR', 'USD', 'EGP', 'DZD'];
    }
  },

  /**
   * Trigger ETL process for a specific date range
   * @param {string} startDate - Start date in YYYY-MM-DD format
   * @param {string} endDate - End date in YYYY-MM-DD format
   * @returns {Promise<Object>} - ETL process result
   */
  async triggerETL(startDate, endDate) {
    try {
      const response = await axios.post(`${API_BASE_URL}/etl/run`, {
        start_date: startDate,
        end_date: endDate
      });
      return response.data;
    } catch (error) {
      console.error('Error triggering ETL process:', error);
      throw error;
    }
  }
};

module.exports = api;
