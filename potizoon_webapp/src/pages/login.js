import React, { useEffect } from 'react';

import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';

// objeto obtido da funcao getAuth(app)
import { auth } from '../../firebaseConfig.js';

function tellAppInventor(message) {
  try {
      window.AppInventor.setWebViewString( message );
  } catch(e) {
      console.log("App Inventor Communication Error",e)
  }
}

function LoginPage() {

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      signInWithRedirect(auth, provider)
      getRedirectResult(auth) 
      .then((result) => {
          const result_dict = {
            "credential": provider.credentialFromResult(result),
            "token": this.credential.acessToken,
            "user": result.user,
            "operationType": result.operationType,
          };
          tellAppInventor(result_dict)
      })
     
    } catch (error) {
      const error_dict = {
        "email": error.email,
        "credential": error.credential,
        "errorCode": error.code,
        "errorMessage": error.message}
      tellAppInventor(error_dict)
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