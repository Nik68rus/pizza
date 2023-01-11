import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/store';
import {
  selectAdminStatus,
  selectAuthStatus,
  selectUserLoading,
} from '../store/slices/userSlice';
import { Status } from '../types';
import { RoutePath } from '../types/routes';
import Spinner from './Spinner';

interface Props {
  admin?: boolean;
}
const PrivateRoute = ({ admin }: Props) => {
  const isAuth = useAppSelector(selectAuthStatus);
  const isAdmin = useAppSelector(selectAdminStatus);
  const authCheck = useAppSelector(selectUserLoading);

  console.log(admin);

  if (authCheck === Status.LOADING) {
    return <Spinner />;
  }

  // if (admin) {
  //   return isAdmin ? <Outlet /> : <Navigate to={RoutePath.HOME} />;
  // }

  return isAuth ? <Outlet /> : <Navigate to={RoutePath.LOGIN} />;
};

export default PrivateRoute;
