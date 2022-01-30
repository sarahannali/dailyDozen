import React, {
  createContext, SetStateAction, useMemo, useState, Dispatch,
} from 'react';
import { User } from 'firebase/auth';

type AuthProviderProps = {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>
}

type AuthValueType = {
  user: User | null,
  setUser?: Dispatch<SetStateAction<User | null>>
};

export const AuthContext = createContext<AuthValueType>({ user: null });

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo<AuthValueType>(() => ({
    user,
    setUser,
  }), [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
