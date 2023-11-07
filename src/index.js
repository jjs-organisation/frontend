import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index/def.css';
import App from './App';
import Layout from "./layout";
import Header from "./elements/header";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <>
          <App />
      </>
  </React.StrictMode>
);
