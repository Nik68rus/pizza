import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './components';
import './scss/app.scss';
import AppRouter from './components/AppRouter';
import { toast, ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from './hooks/store';
import {
  checkAuth,
  selectAuthStatus,
  selectError,
  selectMessage,
} from './store/slices/userSlice';

function App() {
  const error = useAppSelector(selectError);
  const message = useAppSelector(selectMessage);
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);

  useEffect(() => {
    if (!authStatus) {
      dispatch(checkAuth());
    }
  }, [dispatch, authStatus]);

  useEffect(() => {
    if (error.length) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (message.length) {
      toast.success(message);
    }
  }, [message]);

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
