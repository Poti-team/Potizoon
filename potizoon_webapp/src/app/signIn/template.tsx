'use client';

import type { Viewport } from 'next'
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult, OAuthCredential } from 'firebase/auth';

import React, { useEffect } from 'react';
import { signInWithGoogleRedirect, auth, createDocument } from '../../utils/firebase/firebase.utils';
import { FirebaseError } from 'firebase/app';
import Router from 'next/router';


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

function Template({ children }: { children: React.ReactNode }) {

  // function tellAppInventor(message: String | Object) {
  //   try {
  //     console.log("Sending message to App Inventor", message);
  //     (window as any).AppInventor.setWebViewString(message);
  //   } catch (e) {kugigbikhjkl
  //     console.log("App Inventor Communication Error", e);
  //   }
  // }

  useEffect(() => {
    async function handleSignInRedirect() {
      const response = await getRedirectResult(auth);  
      if (!response) {
        signInWithGoogleRedirect();
      } else {
        const userData = {
          createdAt: new Date(),
          email: response.user.email,
          username: response.user.displayName,
          photoUrl: response.user.photoURL,
          providerData: response.user.providerData.map((provider) => provider.providerId),
          uid: response.user.uid,
          mapSearchHistory: [],
          userScore: 0,
          roles: ['user']
        };
        try {
          await createDocument(response.user.uid, 'users', userData);
        } catch (error) {
          const errorCode = (error as FirebaseError).code;
          const errorMessage = (error as FirebaseError).message;
          console.error(`Error creating user document: ${errorCode} - ${errorMessage}`);
        }

        console.log("Email "+ response.user.email + "," + "Username "+ response.user.displayName + "," + "PhotoUrl "+ response.user.photoURL + "," + "ProviderID "+ response.user.providerData.map((provider) => provider.providerId)+ "," + "UserID "+ response.user.uid);
        
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
