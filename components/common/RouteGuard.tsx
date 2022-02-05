import React, {
  useContext, ReactNode,
} from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Login from '../pages/login/Login';

function RouteGuard({ children }: { children: ReactNode}) {
  const { user } = useContext(AuthContext);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (user) return <>{children}</>;
  return <Login />;
}

export default RouteGuard;
