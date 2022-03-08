import { Spin } from 'antd';
import React, {
  useContext, ReactNode,
} from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Login from '../pages/login/Login';

function RouteGuard({ children }: { children: ReactNode}) {
  const { user } = useContext(AuthContext);

  if (user === null) return <Login />;
  if (user === undefined) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
      >
        <Spin spinning size="large" />
      </div>
    );
  }
  return { children };
}

export default RouteGuard;
