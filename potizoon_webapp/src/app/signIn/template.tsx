'use client';

import type { Viewport } from 'next'
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, OAuthCredential } from 'firebase/auth';

import React, { useEffect } from 'react';
import { signInWithGoogleRedirect, createUserDocumentFromAuth, auth } from '../../utils/firebase/firebase.utils.js';
import { FirebaseError } from 'firebase/app';
import Router from 'next/router';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function Template({ children }: { children: React.ReactNode }) {
  const signIn = () => {
    useEffect(() => {
        signInWithGoogleRedirect();
        const handleSignIn = async () => {
          const result = await getRedirectResult(auth);
          console.log(result);
        };
        handleSignIn();
    }, []);
  
  }

  signIn();
  
   

  function tellAppInventor(message: String | Object) {
    try {
      console.log("Sending message to App Inventor", message);
      (window as any).AppInventor.setWebViewString(message);
    } catch (e) {
      console.log("App Inventor Communication Error", e);
    }
  }

  return (
    <div className="login-container">
      <h1>Você está sendo redirecionado para o login</h1>
      {children}
    </div>
  );
}