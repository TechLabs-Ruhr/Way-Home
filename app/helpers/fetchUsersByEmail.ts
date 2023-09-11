import { fetchRedis } from '@/helpers/redis';
import { Redis } from '@upstash/redis';

async function fetchUserByEmail(email: string) {
  
  const redis = new Redis({ url: 'https://fast-raptor-39621.upstash.io', token: 'AZrFASQgODJiNDRjNjgtNmFiOS00ODljLWE3MGYtZDY5Mzk3MzMzMzg4MjZlYjZiYTExZTczNDkxZTliMmI5NWM5MWRhZmEzMmM=' });

  const key = `user:email:${email}`;

  try {
    const id = await redis.get(key) as string
    return id;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
}

export default fetchUserByEmail;