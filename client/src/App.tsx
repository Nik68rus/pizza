import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components';
import './scss/app.scss';
import AppRouter from './components/AppRouter';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Header />
        <AppRouter />
        <ToastContainer autoClose={2000} />
      </Router>
    </div>
  );
}

export default App;
