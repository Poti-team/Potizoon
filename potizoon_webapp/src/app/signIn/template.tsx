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
  useEffect(() => {
    async function handleSignInRedirect() {
      const response = await getRedirectResult(auth);
      console.log("Response", response);
  
      if (!response) {
        signInWithGoogleRedirect();
      } else {
        const credential = GoogleAuthProvider.credentialFromResult(response);
        const providerId = credential?.providerId;
        const token = (credential as OAuthCredential).accessToken;
        const user = response.user;

        console.log("User", user);
        console.log("Token", token);
        console.log("Provider ID", providerId);
        console.log("Credential", credential);
            } 
          }
    handleSignInRedirect();
  
  }, []);

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

export default Template;
