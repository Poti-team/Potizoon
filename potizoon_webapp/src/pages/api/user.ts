// pages/api/user.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Extract user data from request body
    const userData = req.body;

    try {
      // Here, you would typically save userData to your database
      console.log('Received user data:', userData);

      // Respond with a success status code and message
      res.status(200).json({ message: 'User data received successfully' });
    } catch (error) {
      console.error('Error saving user data:', error);
      // Respond with an error status code and message
      res.status(500).json({ message: 'Error saving user data' });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


    