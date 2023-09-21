import { Awaitable, NextAuthOptions, RequestInternal, User } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db } from './db'
//import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchRedis } from "@/helpers/redis";
import GoogleProvider from "next-auth/providers/google"


export const authOptions: NextAuthOptions = { //assigning a type to the authOptions constant 
    adapter: UpstashRedisAdapter(db),
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/signin', 
    },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider( {
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-coolusername"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials) {
                //Here is where user data needs to be retrieved  
                const user = { id: "23", name: "Mariusz", password: "password"}

                if(credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
            
        })
    ],
    callbacks: {
        async jwt ({token, user}) {
            const dbUserResult = await fetchRedis('get', `user:${token.id}`) as
            | string
            | null

            if(!dbUserResult) {
                token.id = user!.id
                return token
            }
            const dbUser = JSON.parse(dbUserResult) as User

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture:dbUser.image,
            }
        },
        async session({session, token}) {
            if(token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }
            return session
        }, 
        redirect() {
            return '/dashboard'
        },
    },
}