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

function Template({ children }: { children: React.ReactNode }) {

  function tellAppInventor(message: String | Object) {
    try {
      console.log("Sending message to App Inventor", message);
      (window as any).AppInventor.setWebViewString(message);
    } catch (e) {
      console.log("App Inventor Communication Error", e);
    }
  }

  useEffect(() => {
    async function handleSignInRedirect() {
      const response = await getRedirectResult(auth);
      console.log("Response", response);
  
      if (!response) {
        signInWithGoogleRedirect();
      } else {
        const userDocRef = await createUserDocumentFromAuth(response.user);
        tellAppInventor(response.user);
        }
      } 
          
    handleSignInRedirect();
  
  }, []);

  

  return (
    <div className="login-container">
      <h1>Você está sendo redirecionado para o login</h1>
      {children}
    </div>
  );
}

export default Template;
