import React, { useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { useRouter } from 'next/router';

function LoginPage() {

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      console.log('Usuário autenticado:', user);
  
      // Prepare user data to be sent
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        // Add other user properties you need to send
      };
  
      // Send user data to server
      await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      // Redirecionar para página principal após login bem-sucedido
      router.push('/');
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
    }
  }

}

useEffect(() => {
    handleGoogleLogin();
});

export default LoginPage;
