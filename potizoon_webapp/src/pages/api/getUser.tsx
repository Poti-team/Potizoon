import * as admin from 'firebase-admin';
import app from '../../../firebaseConfig'
import { NextApiRequest, NextApiResponse } from 'next';

const serviceAccount = require('../../../firebaseConfig.js'); // Caminho para o arquivo de credenciais

function getUser() {
  admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

  async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = localStorage.getItem('authToken');
  
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
  
    try {
      // linha ligada ao firebase auth
      const decodedToken = await admin.auth(app).verifyIdToken(token);
      const user = {
        uid: decodedToken.uid,
        displayName: decodedToken.displayName,
        email: decodedToken.email,
      };
  
      res.status(200).json(user);

    } catch (error) {
      console.error('Erro ao verificar token:', error);
      // res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default getUser;