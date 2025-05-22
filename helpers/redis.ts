const upstashRedisUrl = process.env.UPSTASH_REDIS_REST_URL;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN as string;

type Command = 'zrange' | 'sismember' | 'set' | 'get' | 'smembers' | 'exists';

export async function fetchRedis(
    command: Command,
    ...args: (string | number)[]
) {
    if (!upstashRedisUrl || !authToken) {
        throw new Error('Redis environment variables are not set.');
    }

    const commandUrl = `${upstashRedisUrl}/${command}/${args.join('/')}`;

    try {
        const response = await fetch(commandUrl, {
            headers: { Authorization: `Bearer ${authToken}` },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Error executing Redis command: ${response.statusText}`);
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Redis command failed:', error);
        throw error;
    }
}