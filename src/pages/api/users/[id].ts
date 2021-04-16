import { VercelRequest, VercelResponse } from '@vercel/node';
import connectToDatabase from '../../../services/database';

export default async (request: VercelRequest, response: VercelResponse) => {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection('users');
  const user = await collection.findOne({ id: request.query.id });
  return response.status(200).json({ user });
};
