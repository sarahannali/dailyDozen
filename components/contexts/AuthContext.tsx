import React, {
  createContext, SetStateAction, useMemo, useState, Dispatch,
} from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../firebase/clientApp';

type AuthProviderProps = {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>
}

type AuthValueType = {
  user: User | null | undefined,
  setUser?: Dispatch<SetStateAction<User | null | undefined>>
};

export const AuthContext = createContext<AuthValueType>({ user: null });

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  onAuthStateChanged(auth, (currentUser) => setUser(currentUser));

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
