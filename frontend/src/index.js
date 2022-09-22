import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from "react-query/devtools";


const queryClient = new QueryClient();
queryClient.invalidateQueries(["chat-list"]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        <App />
      </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
