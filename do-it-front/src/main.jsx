import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext.jsx';
import { CreateListModalProvider } from './contexts/CreateListModalContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CreateListModalProvider>
          <App />
        </CreateListModalProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
