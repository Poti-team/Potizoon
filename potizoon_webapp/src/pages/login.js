import React, { useEffect } from 'react';

import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

// objeto obtido da funcao getAuth(app)
import { auth } from '../../firebaseConfig.js';
import { useRouter } from 'next/router';

function LoginPage() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      signInWithRedirect(auth, provider)
      
      getRedirectResult(auth) //função que retorna estrutura contendo user, operationType, credential "and any additional user information that was returned from the identity provider. "

      .then((user) => {
            // // Prepare user data to be sent
          const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            // Add other user properties you need to send
          };

          // Send user data to server
          fetch('/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });

          router.push("/")

        //quero mandar user, credential e operationType como resposta http após login efetuado com sucesso
      })
     
    } catch (error) {

      const email = error.email;
      const credential = error.credential;
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage, email, credential)
       
        
    }
  };

  useEffect(() => {
    handleGoogleLogin();
  }, []);

  return (
    <div className="login-container">
      <h1>Você está sendo redirecionado para o login</h1>
    </div>
  );
}

export default LoginPage;