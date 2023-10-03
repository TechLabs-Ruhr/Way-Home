import { Awaitable, NextAuthOptions, RequestInternal, User } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { db } from './db'
//import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchRedis } from "@/helpers/redis";
import GoogleProvider from "next-auth/providers/google"
var bcrypt = require('bcryptjs');



export const authOptions: NextAuthOptions = { 
    adapter: UpstashRedisAdapter(db), //configure aithentication adapter
    session: {
        strategy: 'jwt', // define the session strategy as JSON Web Tokens
    },
    pages: {
        signIn: '/signin', 
    },
    providers: [
        GitHubProvider({
            //retrieve environment variable values from the .env.local file
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider( { 
            name: "Credentials",
            credentials: { // define credentials provided in the authentication process 
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
            async authorize(credentials) { 
            try {
                if(!credentials?.email || !credentials.password) { // check if user provided any credentiaks (we denote credentials as optional to avoid typescript error)
                    throw new Error("You have to provide your username and password to sign in")
                   }
                // Parse user credentials from the login form
                const email = credentials!.email;
                const password = credentials.password;

                // Fetch the user data from Redis based on the email
                const userDataKey = `user:${email}`;
                const userData = await fetchRedis('get', userDataKey) as
                | string
                | null

                if (!userData) { // if the value of the userData is null
                throw new Error("The user with the given email does not exist")  //Inform front end that the user with the provided email does not exist
                }

                // Parse the user data from Redis 
                const userDataObj = JSON.parse(userData);
                console.log(userDataObj)

                // Check if the password matches
                const isPasswordValid = await bcrypt.compare(password, userDataObj.password)
                
                console.log("is Password Valid?", isPasswordValid)
                
                if (isPasswordValid) { //if the password is valid return user object
                const user = {
                    id: userDataObj.id,
                    email: userDataObj.email,
                    name: userDataObj.firstName,
                    picture: userDataObj.image,
                };
              
                return user;
                } else {
                // inform front end that the provided password is wrong
                throw new Response('Wrong password')
                }
            } catch (error) {
                console.error('Error during authorization:', error);
                return null;
            }
        },

    })],
    callbacks: { // in the callback functions we define what happens when the user signs in 
        async jwt ({ //the jwt function  returns a jwt value that is then stored for the session token
            token, user}) { // upon successful authentication a JSON web token is created 
            const dbUserResult = await fetchRedis('get', `user:${token.id}`) as // check if there is already such a user in the database 
            | string
            | null
            if(!dbUserResult) { // if the user doesn't exist yet 
                token.id = user!.id // then the id property of the JWT is updated with  the id property of the user object provided by NextAuth
                // The "!" is a TypeScript non-null assertion operator telling TypeScript to trust that the user is not null or undefined
                return token
            }
            const dbUser = JSON.parse(dbUserResult) as User // if the user already exists
            return {  //then we are assigning the values of the existing user to the values of the returned JSON web token
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture:dbUser.image,
            }
        },
        async session({session, token}) { // the session function return the session object which is used to determined whether the user is alredy signed in or not
            if(token) { // assigning the token values corresponding to the user data to the session values 
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }
            return session // returning session regardless if there is a token or not 
        }, 
        redirect() {
            return '/dashboard'
        },
    },
}