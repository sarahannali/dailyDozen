/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import '../styles.css';
import AuthProvider from '../components/contexts/AuthContext';
import RouteGuard from '../components/common/RouteGuard';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AuthProvider>
      <RouteGuard>
        {getLayout(<Component {...pageProps} />)}
      </RouteGuard>
    </AuthProvider>
  );
}
