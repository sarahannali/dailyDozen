/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import '../styles.css';
import type { AppProps } from 'next/app';
import AppLayout from '../components/layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}
