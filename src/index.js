import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import { Provider } from 'react-redux';
import { store } from './routes/store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// Create React root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render App with Redux Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// ✅ Register service worker for PWA capabilities
serviceWorkerRegistration.register();
