import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="424621320397-p6t19qftdq2gdg4don8d46hnrcb8fd6k.apps.googleusercontent.com">

  <React.StrictMode>
    <App />
  </React.StrictMode>
  </GoogleOAuthProvider>,
);
reportWebVitals();
