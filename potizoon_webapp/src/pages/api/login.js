import React, { useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { useRouter } from 'next/router';

function LoginPage() {
  // react hook useState sendo utilizado
  const [loginInfo, setLoginInfo] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      const { user, credential, operationType } = userCredential;

      // ... (logic to construct loginInfo object)

      // Assuming you have an API endpoint to handle login information
      console.log("before defining response");
      const response = await fetch('/api/getUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo),
      });

      if (!response.ok) {
        console.log("response not ok");
        throw new Error(`API error! status: ${response.status}`); // More specific error message
      }

      const data = await response.json();
      setLoginInfo({ user, credential, operationType });
      localStorage.setItem('authToken', data.token);

      // Handle successful login (optional, e.g., redirect to home page)
      router.push('/');
    } catch (error) {
      console.error('Erro:', error);
      setError(error);
    }
  };

  // ... (rest of the code)


  useEffect(() => {
    console.log("Antes de executar função handle login google")
    handleGoogleLogin();
  }, []);

  return (
    <div className="login-container">
      {error ? (
        <div className="error-message">{error.message}</div>
      ) : (
        <h1>Login com Google</h1>
      )}
    </div>
  );
}

export default LoginPage;
