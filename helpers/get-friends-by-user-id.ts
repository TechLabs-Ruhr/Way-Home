import { fetchRedis } from "./redis"

export const getFriendsByUserId = async (userId: string) => {
    //retrieve friends for current user 
    //const friendIds = fetchRedis('smembers', `user:${userId}:friends`) as string[]

}