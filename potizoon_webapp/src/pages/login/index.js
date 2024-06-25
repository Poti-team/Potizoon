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
      console.log('Usuário autenticado:', user);

      // Redirecionar para página principal após login bem-sucedido
      router.push('/');
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