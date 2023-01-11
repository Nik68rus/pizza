import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Admin from '../pages/Admin';
import Auth from '../pages/Auth';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import { RoutePath } from '../types/routes';
import { Spinner } from '.';
import Profile from '../pages/Profile';
import PrivateRoute from './PrivateRoute';

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ '../pages/Cart')
);
const PizzaDetails = React.lazy(
  () => import(/* webpackChunkName: "Details" */ '../pages/PizzaDetails')
);

const AppRouter = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path={RoutePath.HOME} element={<Home />} />
        <Route
          path={`${RoutePath.DETAILS}/:pizzaId`}
          element={<PizzaDetails />}
        />
        <Route path={RoutePath.ADMIN} element={<PrivateRoute admin={true} />}>
          <Route path={RoutePath.ADMIN} element={<Admin />} />
        </Route>
        <Route path={RoutePath.PROFILE} element={<PrivateRoute />}>
          <Route path={RoutePath.PROFILE} element={<Profile />} />
        </Route>
        <Route path={RoutePath.LOGIN} element={<Auth />} />
        <Route path={RoutePath.SIGNUP} element={<Auth />} />
        <Route path={RoutePath.PROFILE} element={<Profile />} />
        <Route path={RoutePath.CART} element={<Cart />} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
