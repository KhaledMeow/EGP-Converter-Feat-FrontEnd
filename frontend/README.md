# Currency Exchange Frontend

A modern React-based frontend for the Currency Exchange application that provides real-time and historical currency exchange rates with an intuitive user interface.

## 📋 Table of Contents
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [API Integration](#-api-integration)
- [Styling](#-styling)
- [Deployment](#-deployment)

## ✨ Features

- **Real-time Currency Conversion**
  - Convert between multiple currencies (USD, EUR, EGP, DZD)
  - Swap currencies with a single click
  - Responsive design for all screen sizes

- **Exchange Rate Display**
  - View current exchange rates
  - Filter by base currency
  - Sortable rate columns

- **Historical Data**
  - View historical exchange rates
  - Select specific dates or date ranges
  - Visual charts for trend analysis

## 🚀 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn
- Backend API server (see backend documentation)

## 🛠 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the frontend directory (see [Environment Variables](#-environment-variables))

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the frontend directory with the following variables:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

Replace the URL with your backend API URL when deploying to production.

## 📜 Available Scripts

In the project directory, you can run:

- `npm start` or `yarn start`
  - Runs the app in development mode
  - Open [http://localhost:3000](http://localhost:3000) to view it in the browser

- `npm test` or `yarn test`
  - Launches the test runner in interactive watch mode

- `npm run build` or `yarn build`
  - Builds the app for production to the `build` folder
  - Correctly bundles React in production mode and optimizes the build for the best performance

- `npm run eject` or `yarn eject`
  - **Note: This is a one-way operation**
  - If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time

## 📁 Project Structure

```
frontend/
├── public/                 # Static files
├── src/
│   ├── components/         # Reusable React components
│   │   ├── CurrencyConverter.js
│   │   ├── ExchangeRates.js
│   │   ├── Header.js
│   │   └── HistoricalData.js
│   │
│   ├── services/           # API and service layer
│   │   └── api.js
│   │
│   ├── styles/             # CSS styles
│   │   ├── converter.css
│   │   ├── header.css
│   │   ├── historical.css
│   │   ├── main.css
│   │   └── rates.css
│   │
│   ├── config.js           # Application configuration
│   └── index.js            # Application entry point
│
├── .env                   # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## 🔌 API Integration

The frontend communicates with the backend API using Axios. The main API service is located in `src/services/api.js` and includes the following methods:

- `convertCurrency(from, to, amount)` - Convert between currencies
- `getLatestRates(base)` - Get latest exchange rates
- `getHistoricalRates(date, base)` - Get historical rates for a specific date
- `getHistoricalRatesForMonth(year, month, base)` - Get monthly historical rates
- `getHistoricalRatesForYear(year, base)` - Get yearly historical rates
- `getAvailableCurrencies()` - Get list of available currencies
- `triggerETL()` - Manually trigger ETL process
- `getETLStatus()` - Check ETL process status
- `triggerETLDateRange(startDate, endDate)` - Trigger ETL for a date range

## 🎨 Styling

The application uses custom CSS with a responsive design. The styles are organized by component in the `src/styles` directory.

### Main Styling Features:
- Responsive grid layout
- Card-based component design
- Interactive form elements
- Loading states and error messages
- Mobile-friendly navigation

## 🚀 Deployment

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

This will create an optimized production build in the `build` folder.

### Serving the Production Build

You can serve the production build locally using `serve`:

```bash
npm install -g serve
serve -s build
```

### Deploying to a Static Host

You can deploy the `build` folder to any static hosting service, such as:
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [GitHub Pages](https://pages.github.com/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Axios](https://github.com/axios/axios)
- [date-fns](https://date-fns.org/)
- [Bootstrap](https://getbootstrap.com/) (for responsive grid)
