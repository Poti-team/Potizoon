import * as admin from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';

const serviceAccount = require('../../../firebaseConfig.js'); // Caminho para o arquivo de credenciais

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const user = {
      uid: decodedToken.uid,
      displayName: decodedToken.displayName,
      email: decodedToken.email,
    };

    res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
