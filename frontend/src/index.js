import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App';
import "antd/dist/antd.css";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
          <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
