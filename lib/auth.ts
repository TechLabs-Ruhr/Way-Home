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
    debug: true,
    session: {
        strategy: 'jwt', // define the session strategy as JSON Web Tokens
    },
    pages: {
        signIn: '/signin', 
    },
    providers: [
         //retrieve environment variable values from the .env.local file
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
            // define credentials provided in the authentication process 
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
            async authorize(credentials) { 
            try {
                 // Check if credentials are provided
                if(!credentials?.email || !credentials.password) { // check if user provided any credentiaks (we denote credentials as optional to avoid typescript error)
                    console.error('Missing email or password');
                        throw new Error("You have to provide your username and password to sign in")
                   }
                // Parse user credentials from the login form
                const email = credentials!.email;
                const password = credentials.password;

                // Fetch the user data from Redis based on the email
                const userDataKey = `user:${email}`;

               console.log("Jetzt erfogt die speicherung der userdaten in redis")
                const userData = await fetchRedis('get', userDataKey);

                if (!userData) { // if the value of the userData is null
                throw new Error("The user with the given email does not exist")  //Inform front end that the user with the provided email does not exist
                }

                // Parse the user data from Redis 
                const userDataObj = JSON.parse(userData);
                console.log(userDataObj)

                // Check if the password matches
                const isPasswordValid = await bcrypt.compare(password, userDataObj.password)
                
                if (isPasswordValid) {
                console.log('User authenticated successfully');
                // Return the user object 
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
    // in the callback functions we define what happens when the user signs in 
    callbacks: { 
        async jwt ({ 
            token, user}) { 
            const dbUserResult = await fetchRedis('get', `user:${token.id}`) as  
            | string
            | null
            if(!dbUserResult) { 
                token.id = user!.id 
                token.name = user!.name;
                token.email = user!.email;
                token.picture = user!.image;
                return token
            }
            const dbUser = JSON.parse(dbUserResult) as User 
            return {  //then we are assigning the values of the existing user to the values of the returned JSON web token
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
            return session // returning session regardless if there is a token or not 
        }, 
        redirect() {
            return '/dashboard'
        },
    },
}