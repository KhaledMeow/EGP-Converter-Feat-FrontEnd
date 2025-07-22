const axios = require('axios');
const { API_BASE_URL } = require('../config');

// Create axios instance with base URL
const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for error handling
apiInstance.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response from server:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

const api = {
  /**
   * Convert an amount from one currency to another
   * @param {string} from - Source currency code (e.g., 'USD')
   * @param {string} to - Target currency code (e.g., 'EUR')
   * @param {number} amount - Amount to convert
   * @returns {Promise<Object>} - Conversion result
   */
  convertCurrency: async (from, to, amount) => {
    const response = await apiInstance.get('/convert', {
      params: { from, to, amount }
    });
    return response.data;
  },

  /**
   * Get latest exchange rates
   * @param {string} [base='EUR'] - Base currency
   * @returns {Promise<Object>} Latest exchange rates
   */
  getLatestRates: async (base = 'EUR') => {
    const response = await apiInstance.get('/latest', {
      params: { base }
    });
    return response.data;
  },

  /**
   * Get historical exchange rates for a specific date
   * @param {string} date - Date in YYYY-MM-DD format
   * @param {string} [base='EUR'] - Base currency
   * @returns {Promise<Object>} Historical rates for the specified date
   */
  getHistoricalRates: async (date, base = 'EUR') => {
    const response = await apiInstance.get(`/${date}`, {
      params: { base }
    });
    return response.data;
  },

  /**
   * Get historical exchange rates for a specific month
   * @param {number} year - Year (e.g., 2023)
   * @param {number} month - Month (1-12)
   * @param {string} [base='EUR'] - Base currency
   * @returns {Promise<Object>} Monthly historical rates
   */
  getHistoricalRatesForMonth: async (year, month, base = 'EUR') => {
    const response = await apiInstance.get('/history/monthly', {
      params: { year, month, base }
    });
    return response.data;
  },

  /**
   * Get historical exchange rates for a specific year
   * @param {number} year - Year (e.g., 2023)
   * @param {string} [base='EUR'] - Base currency
   * @returns {Promise<Object>} Yearly historical rates
   */
  getHistoricalRatesForYear: async (year, base = 'EUR') => {
    const response = await apiInstance.get('/history/yearly', {
      params: { year, base }
    });
    return response.data;
  },

  /**
   * Trigger ETL process
   * @returns {Promise<Object>} ETL process status
   */
  triggerETL: async () => {
    const response = await apiInstance.post('/etl/trigger');
    return response.data;
  },

  /**
   * Get ETL process status
   * @returns {Promise<Object>} ETL process status
   */
  getETLStatus: async () => {
    const response = await apiInstance.get('/etl/status');
    return response.data;
  },

  /**
   * Get available currencies
   * @returns {Promise<Array>} - List of available currency codes
   */
  getAvailableCurrencies: async () => {
    try {
      const response = await apiInstance.get('/currencies');
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
  triggerETLDateRange: async (startDate, endDate) => {
    try {
      const response = await apiInstance.post('/etl/run', {
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
