import { Spin } from 'antd';
import React, {
  useContext, ReactNode,
} from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Login from '../pages/login/Login';

function RouteGuard({ children }: { children: ReactNode}) {
  const { user } = useContext(AuthContext);

  if (user === null) return <Login />;
  return <Spin spinning={user === undefined}>{children}</Spin>;
}

export default RouteGuard;
