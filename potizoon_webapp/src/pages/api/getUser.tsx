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
    console.log("func started")
  
    if (!token) {
        console.log("Token not here")
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
  
    try {
      console.log("try start")
      // linha ligada ao firebase auth
      const decodedToken = await admin.auth(app).verifyIdToken(token);
      console.log("aftertoken")
      const user = {
        uid: decodedToken.uid,
        displayName: decodedToken.displayName,
        email: decodedToken.email,
      };
      
      console.log("oii")
      res.status(200).json(user);
      console.log("Status 200 ")

    } catch (error) {
      console.log("Problema no token")
      console.error('Erro ao verificar token:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default getUser;