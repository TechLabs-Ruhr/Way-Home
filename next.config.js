/** @type {import('next').NextConfig} */

const { parsed: localEnv } = require('dotenv').config({
    path: '.env.local',
  });


const nextConfig = {
    env: {
        UPSTASH_REDIS_REST_URL: localEnv.UPSTASH_REDIS_REST_URL,
        UPSTASH_REDIS_REST_TOKEN: localEnv.UPSTASH_REDIS_REST_TOKEN,
       },
       images: {
        domains: ['avatars.githubusercontent.com']
       }
}

module.exports = nextConfig 
    
