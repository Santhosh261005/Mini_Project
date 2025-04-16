import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Provider } from 'react-redux';
import store from './redux/store'; // ✅ adjust this path to your actual store location

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}> {/* ✅ Redux store context */}
    <BrowserRouter>
      <AuthProvider> {/* ✅ Your custom auth context */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);
