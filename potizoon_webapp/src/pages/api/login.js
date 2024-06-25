const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    if (response.ok) {
      const userData = await response.json();
      console.log('Dados do usuário:', userData);

      // Fetch user data from `/api/getUser` using the accessToken
      const response = await fetch('/api/getUser', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      if (response.ok) {
        const getUserData = await response.json();
        console.log('Dados do usuário da API getUser:', getUserData);
      } else {
        console.error('Erro ao obter dados do usuário da API getUser:', response.status);
      }
    } else {
      console.error('Erro ao obter dados do usuário:', response.status);
    }
  } catch (error) {
    console.error('Erro ao fazer login com Google:', error);
  }
};
