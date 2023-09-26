import { Awaitable, NextAuthOptions, RequestInternal, User } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db } from './db'
//import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchRedis } from "@/helpers/redis";
import GoogleProvider from "next-auth/providers/google"
import { z } from "zod";
var bcrypt = require('bcryptjs');


interface LoginCredentials {
    email: string;
    password: string;
  }

const loginUserSchema = z.object({
    firstName: z.string().regex(/^[a-z ,.'-]+$/i, 'invalid first name'),
    lastName: z.string().regex(/^[a-z ,.'-]+$/i, 'invalid last name'),
    email: z.string().email(),
    password: z.string().min(5, 'Password should have at least 5 characters'),
  })

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
                email: {
                    label: "email",
                    type: "text",
                    placeholder: "yourEmail"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials, req) {
            try {
               if(!credentials?.email || !credentials.password) {
                return null
               }
                // Parse user credentials from the login form
                const email = credentials.email;
                const password = credentials.password;

                // Fetch the user data from Redis based on the email
                const userDataKey = `user:${email}`;
                const userData = await fetchRedis('get', userDataKey);

                if (!userData) {
                // User with the given email does not exist
                console.log(("The user with the given email does not exist"))
                return null;
                }

                // Parse the user data from Redis 
                const userDataObj = JSON.parse(userData);

                // Check if the password matches
                const isPasswordValid = await bcrypt.compare(credentials.password, userDataObj.password)
                
                if (isPasswordValid) {
                // Return the user object 
                const user = {
                    id: userDataObj.id,
                    email: userDataObj.email,
                    name: userDataObj.firstName,
                    picture: userDataObj.image,
                };
              
                return user;
                } else {
                // Password does not match
                throw new Error('invalid credentials')
                }
            } catch (error) {
                console.error('Error during authorization:', error);
                return null;
            }
        },

    })],
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