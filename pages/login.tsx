import React, { useContext } from 'react';
import { AuthContext } from '../components/contexts/AuthContext';
import Login from '../components/login/Login';

export default function LoginPage() {
  const [user, setUser] = useContext(AuthContext);
  console.log(user);

  return (
    <Login />
  );
}
