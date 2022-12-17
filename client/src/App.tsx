import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import './scss/app.scss';
import AppRouter from './components/AppRouter';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Header />
        <AppRouter />
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
