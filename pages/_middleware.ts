/* eslint-disable import/prefer-default-export */
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { auth } from '../firebase/clientApp';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const user = auth.currentUser;
  console.log('USER: ', user);
  console.log('REQ URL: ', req.nextUrl.pathname);

  // if (req.nextUrl.pathname !== '/login' && user === null) {
  //   return NextResponse.redirect('/login');
  // }
  // return NextResponse.next();
}
