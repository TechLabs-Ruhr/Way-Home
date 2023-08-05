import {Redis, Requester} from '@upstash/redis'

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
  throw new Error('UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN is missing in environment variables.');
}

export const db = new Redis({
    url: url,
    token: token,
})