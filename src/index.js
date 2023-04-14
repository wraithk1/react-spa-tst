import React from 'react';
import ReactDOM from 'react-dom/client';
import { render } from 'react-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { StoreContext } from 'storeon/react'
import { store } from './store/store'
import "tailwindcss/tailwind.css";
import './main.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AnimatePresence>
    <StoreContext.Provider value={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreContext.Provider>
  </AnimatePresence>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
