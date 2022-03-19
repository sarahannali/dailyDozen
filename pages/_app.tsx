/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import '../styles.css';
import AuthProvider from '../components/contexts/AuthContext';
import RouteGuard from '../components/common/RouteGuard';
import MobileGroceryList from '../components/pages/mobile/MobileGroceryList';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [width, setWidth] = useState<number>();

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return (
    <AuthProvider>
      <RouteGuard>
        { width && width <= 768
          ? <MobileGroceryList />
          : getLayout(<Component {...pageProps} />)}
      </RouteGuard>
    </AuthProvider>
  );
}
