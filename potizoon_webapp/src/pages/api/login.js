import React, { useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { useRouter } from 'next/router';

function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const response = await fetch('/api/getUser', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('Dados do usuário:', userData);
        
      } else {
        console.error('Erro ao obter dados do usuário:', response.status);
      }
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
    }
  };

  useEffect(() => {
    handleGoogleLogin();
  }, []);

  return (
    <div className="login-container">
      <h1>Espero que o popup tenha aparecido!</h1>
    </div>
  );
}

export default LoginPage;
