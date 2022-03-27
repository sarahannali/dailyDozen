import { Spin } from 'antd';
import React, {
  useContext, ReactNode,
} from 'react';
import { AuthContext } from 'components/contexts/AuthContext';
import Login from 'components/pages/login';
import classes from 'components/css/routeGurad.module.css';

function RouteGuard({ children }: { children: ReactNode}) {
  const { user } = useContext(AuthContext);

  if (user === null) return <Login />;
  if (user === undefined) {
    return (
      <div className={classes.spinningDiv}>
        <Spin spinning size="large" />
      </div>
    );
  }
  return <span>{children}</span>;
}

export default RouteGuard;
