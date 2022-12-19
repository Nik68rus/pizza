import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Admin from '../pages/Admin';
import Auth from '../pages/Auth';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import { RoutePath } from '../types/routes';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={RoutePath.HOME} element={<Home />} />
      <Route path={RoutePath.ADMIN} element={<Admin />} />
      <Route path={RoutePath.LOGIN} element={<Auth />} />
      <Route path={RoutePath.SIGNUP} element={<Auth />} />
      <Route path={RoutePath.CART} element={<Cart />} />
      <Route path={'*'} element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
