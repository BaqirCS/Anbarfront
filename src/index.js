import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/js/bootstrap.bundle';
import { StoreProvider } from './context/Store';

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);
