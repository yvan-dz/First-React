import React from 'react';
import ReactDOM from 'react-dom/client';

// CSS-Dateien zuerst importieren
import './styles/global.css';
import './styles/nav.css';
import './styles/home.css';
import './styles/cart.css';
import './styles/footer.css';
import './styles/checkout.css';
import './styles/orders.css';



// App und andere Module importieren
import App from './App';
import reportWebVitals from './reportWebVitals';

// React Root erstellen und App rendern
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optionale Performance-Messung
reportWebVitals();
