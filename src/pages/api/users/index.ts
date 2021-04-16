import { VercelRequest, VercelResponse } from '@vercel/node';
import connectToDatabase from '../../../services/database';

interface IUser {
  id: string;
}

export default async (request: VercelRequest, response: VercelResponse) => {
  if (request.method === 'GET') return await listUsers(response);
  else return await createOrUpdateUsers(request, response);
};

async function createOrUpdateUsers(
  request: VercelRequest,
  response: VercelResponse
) {
  const user: IUser = request.body;
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection('users');

  const newUser = await collection.updateOne(
    { id: user.id },
    { $set: { ...user } },
    { upsert: true }
  );

  return response.status(201).json({ newUser });
}

async function listUsers(response: VercelResponse) {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection('users');

  let users: IUser[] = [];
  await collection
    .find({ currentExperience: { $gte: 1 } })
    .sort({ currentExperience: -1 })
    .forEach((user) => {
      users.push(user);
    });
  return response.status(200).json({ users });
}
