

# Way Home
#### Find the safest route to your desired destination

The concept of Way Home emerged from a pressing concern for the safety and well-being of individuals, particularly women,
during their commutes. Alarming statistics and anecdotal evidence point to a gap in available solutions for ensuring personal
safety while traveling.<br> 

To address this gap, we implemented a web application that enables users to connect with fellow travelers during their commutes 
via a chat feature powered by a high-speed Redis in-memory database, ensuring immediate communication.<br> 

Accessing our application is made possible through OAuth 2 authentication via GitHub and Google, provided by the NextAuth library.
This streamlines login, boosts security and improves the overall user experience by eliminating the need for users to provide credentials.

With Way Home, we're not just another navigation app. We're a safety-first solution dedicated to empowering you to
feel secure during your journeys. With WayHome, you can embark on adventures, explore new cities, and navigate through unfamiliar 
territories with confidence!<br>
### Tech Stack
The project utilizes a robust tech stack to deliver an efficient and user-friendly experience:

- **Next.js** -a powerful React framework that offers server-side rendering (SSR) and static site generation (SSG) out of the box.<br>
   This results in faster page loads, improved SEO, and a smoother user experience. Additionally, Next.js simplifies routing and API integration,<br>
   which made our development more efficient.
- **TypeScript** -  TypeScript enhanced our development process by adding static typing to JavaScript. This resulted in fewer runtime errors and improved  
  code quality
- **Serverless Upstash Redis Database** -  Using a serverless Redis database from Upstash allowed us to leverage the benefits of a Redis database <br>
  without the operational overhead of managing server infrastructure. Redis is renowned for its lightning-fast data retrieval and caching capabilities, making it<br>
  an excellent choice for  chat applications.
- **Tailwind CSS for Styling** - Tailwind CSS is a utility-first CSS framework that streamlines the styling process. It provided us with a comprehensive set of pre-built<br>
  utility classes that we could use to rapidly create consistent and responsive designs

### How to Setup and Run
Click on this link to see the [Video Tutorial]( https://drive.google.com/file/d/1OgfJpYD617oYt-ve1ox3J7knAlC15y44/view?usp=drive_link) <br>
In order to set up the project, please proceed as follows:

1. Download node.js, and install the npm package manager<br>  
2. Download VS Code and Git (For a more detailed description of setting up GitHub and VS Code use the respective guide in  our ClickUp documentation)

After the successful installation of the above tools you have to go through the following steps to run the project:
1. Clone the project repository
2. open the terminal in vs code. Make sure that you're in the root directory of the project (it should be the directory where you saved the app files from GitHub on your PC) and use the command line: "npm install"
3. Create a file named: ".env.local":

   ![env local file](/public/images/.env.local.png)

   
Place the environment variables in the ".env.local" file in your route directory.
  ```
NEXTAUTH_SECRET = Y2U2nsg2xcyjAVo1FmDI53wvzhuEAY2xqWu5BN5RSaU=

UPSTASH_REDIS_REST_URL=https://fast-raptor-39621.upstash.io
UPSTASH_REDIS_REST_TOKEN=AZrFASQgODJiNDRjNjgtNmFiOS00ODljLWE3MGYtZDY5Mzk3MzMzMzg4MjZlYjZiYTExZTczNDkxZTliMmI5NWM5MWRhZmEzMmM=

GOOGLE_CLIENT_ID = 41656623297-fat94itilm6hdl9g4ct0pv9a4uq6ch97.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET = 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

NEXTAUTH_URL = http://localhost:3000

GITHUB_SECRET = e547a5bbd6f7aecb7d4c1d1502587e4a122f0413 
GITHUB_ID = dd08adf18c3117796549

PUSHER_APP_ID="1670851"
NEXT_PUBLIC_PUSHER_APP_KEY="e568c8d799554e9800d3"
PUSHER_APP_SECRET="86ec0e039322585d00aa"

```
These environment variables are necessary for the connection to the database, the use of Google and Github OAuth 2 and a partly finished real-time functionality for sending and receiving friend requests.<br> 
For safety reasons, they are only stored locally and cannot be pushed to the Github repository
7. Open the terminal and use the command line: "npm run dev"
8. Open the following link http://localhost:3000 in your browser. Now you should be able to see the web application and use its features 

### Examples
#Video walkthroughs:
- All 3 authentication providers and their interaction with the database: [click on this link](https://www.youtube.com/watch?v=SEaSnX1qJDs)
- Chat feature + sending, receiving and accepting friend requests: [click on this link](https://drive.google.com/file/d/1hyZIa0nzIZSOa5_QuuC7yUieBQK_XUBb/view?usp=sharing)
#### Github OAuth 2 Authentication
1. User navigates to the sign in page
2. User clicks on the "Sign in with GitHub" button
3. The function "loginWithGithub()" defined in the "/app/signin/page.tsx" file gets triggered: 
```typecript
async function loginWithGithub() {
    setIsLoadingGitHub(true) // replace provider icon with spinning loading icon 
    try{
      await signIn('github') // initiate GitHub authentication process
    }catch(error) {
      toast.error(`Sign in failed: ${error}`) //provide feedback on the authentication process if there is an error
    } 
  }
```

4. When the GitHub authentication process becomes initiated the API endpoint: "pages/api/auth/[...nextauth.ts] gets called that uses the authOptions constant saved under:
/lib/auth.ts:

```typescript
export const authOptions: NextAuthOptions = { 
    adapter: UpstashRedisAdapter(db), //configure authentication adapter
    session: {
        strategy: 'jwt', // define the session strategy as JSON Web Tokens
    },
    pages: {
        signIn: '/signin', 
    },
    providers: [
        GitHubProvider({ //retrieve environment variable values from the .env.local file
            clientId: process.env.GITHUB_ID as string, 
            clientSecret: process.env.GITHUB_SECRET as string,
        }), ...
```

5. GitHub checks if the user is already logged in to its website.
   If that's not the case it prompts him to provide his GitHub login data and validates them
6. Upon successful User validation, the OAuth 2 Authentication process is almost complete. It just has to go
   through the callbacks section of the authOptions used for managing the session and the JSON web token 

```
   ],
    callbacks: { // in the callback function we define what happens when the user signs in 
        async jwt ({ // the jwt function expects us to return jwt value that is then stored for the session token
            token, user}) { // upon successful OAuth 2 authentication a JSON web token and the user object is provided by NextAuth 
            const dbUserResult = await fetchRedis('get', `user:${token.id}`) as // check if there is already such a user in the database 
            | string
            | null
            if(!dbUserResult)  // if the user doesn't exist yet 
                token.id = user!.id // the id property of the JWT is updated with  the id property of the user object provided by NextAuth
                // The "!" is a TypeScript non-null assertion operator telling TypeScript to trust that the user is not null or undefined  
                return token
            }
            const dbUser = JSON.parse(dbUserResult) as User  // If the user already exists
            return {          //we are assigning the values of the existing user to the values of the JSON web token 
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture:dbUser.image,
            }
        },
        async session({session, token}) { // the session function returns the session object which is used to determine whether the user already signed in or not
            if(token) { // assigning the token values corresponding to the user data to the session values 
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }
            return session // returning session regardless if there is a token or not 
        }, 
        redirect() {
            return '/dashboard' //Finally the user is navigated to the dashboard page from which he can use other app features
        },
    },
}

```
7. The GiHub OAuth 2 Authentication process is completed
   
#### Credential Provider Authentication
1. User navigates to the sign-up page
2. User types in the necessary credentials in the respective input fields and clicks on the sign-up button
3. The function "registerUser()" is triggered:
```
  const registerUser = async (e: FormEvent) => {
    const form = new FormData(e.target as HTMLFormElement);
    e.preventDefault();
    // Assign values to the data object
    const formData = {
      firstName: String(form.get('firstName')),
      lastName: String(form.get('lastName')),
      email: String(form.get('email')),
      password: String(form.get('password')),
     };

    const res = await fetch('/api/register', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(formData), //stringify the user data object to save it as a json string in the db
    })
    // Handle success, e.g., redirect or display a success message  
    if (res.ok) {
      toast.success("Registration Successful")
      // Registration was successful, so navigate to the sign-in page
      router.push('/signin'); 
      } else { 
        toast.error("Registration failed")
      }
  }
```
4. The function calls the register API endpoint:
```
const registerUserSchema = z.object({ //validate user data
  firstName: z.string().regex(/^[a-z ,.'-]+$/i, 'invalid first name'),
  lastName: z.string().regex(/^[a-z ,.'-]+$/i, 'invalid last name'),
  email: z.string().email(),
  password: z.string().min(5, 'Password should have at least 5 characters'),
})

export  async function POST(req: Request) {
    try {
      const body =  await req.json() // receive the json string 
      const formData = registerUserSchema.parse(body); // validate it and parse it to a JS object
      const { firstName, lastName, email, password } = formData;

      //hash the password 
      const hashedPassword =  await bcrypt.hash(password, 10)

      //construct the userDataValidation object needed for sign in validation
      const userDataValidation  = {
        firstName,
        lastName,
        email,
        image: "/images/human-icon.jpg",
        emailVerified: null,
        password: hashedPassword,
        id: uuidv4(),
      };

      //construct the userDataCallbacks object needed for managing the JWT and session  
      const userDataCallbacks  = {
        name: firstName + " " + lastName,
        email,
        image: "/images/human-icon.jpg",
        emailVerified: null,
        id: userDataValidation.id,
      };

      // Convert the user data objects to a JSON string
      const userDataValidationJSON = JSON.stringify(userDataValidation);
      const userDataCallbacksJSON = JSON.stringify(userDataCallbacks);
      
      // Store userValidationJSON string in redis
      await db.set(`user:${userDataValidation.email}`, userDataValidationJSON);

      // Store the userDataValidation string in redis 
      await db.set(`user:${userDataValidation.id}`, userDataCallbacksJSON);      
      
      // Store a third JSON string in Redis in a format required for receiving friend requests
      await db.set(`user:email:${userDataValidation.email}`, userDataValidation.id); 

      return new Response("OK") //inform front end that the registration process was successful
    } catch(error) {  //Otherwise inform front end that the registration process failed
        console.error('Error: ', error)
        if (error instanceof z.ZodError) {
            return new Response('Invalid request payload')
      } else {
        return new Response('Invalid request payload', {status: 422})
      }
    }
}
```

5. The user types in his credentials in the respective input fields and clicks on the sign in button   
6. The function "loginWithCredentials()" defined in the "/app/signin/page.tsx" file gets triggered:

```
 async function loginWithCredentials(e: FormEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const res = await signIn('credentials', { //initiate credential provider authentication process 
      email: String(form.get('email')), // pass the user data from the authentication form 
      password: String(form.get('password')),
      callbackUrl: '/',
      redirect: true
    }
    )
    console.log(res)
  }
 ```
7. When the credentials authentication process becomes initiated the API endpoint: "pages/api/auth/[...nextauth.ts] gets called that uses the authOptions constant saved under:
/lib/auth.ts:
 ```
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
 ```
8. In case of successful authorization the user object returned by the authorize function is then handled in the callbacks section of the auth options to  
   establish a user session. (see the above description of the GitHub OAuth 2 authentication)
9. The credentials provider authentication is completed 
 
### Roadmap

1. **Landing page** - Since  the data science team was looking for useful data sources at the beginning one of the first steps for the web dev team was to create an enticing landing page to encourage new users to sign in and use the app.
2. **Connection to the Google Maps API** - to implement the core app features like route recommendations we had to access the Google Maps API. Since all our data scientists have dropped out of the program, we didn't use
    it for anything other than displaying it on the user dashboard
3. **Authentication** - we used next auth to create the user accounts with sessions that are necessary for the other app features
   Our app includes 3 possible authentication methods:
   - GitHub OAuth 2
   - Google OAuth 2
   - Credential Provider (Standard authentication by creating a user account consisting of username, email and password) 
4. **Chat feature** - Currently the most complex feature of our application it consists of:
   - User dashboard with sign-out function
   - Sending, receiving, viewing and denying friend requests
   - Sending, receiving and viewing text messages 

  
### Authors

- [@Mariusz Seget](https://www.github.com/Isztof)
- [@Lukas Jazwinski](https://github.com/Lumpays)

### Credits
- Next, Typescript, Tailwind template used for the landing page sign up and sign in: https://github.com/cruip/open-react-template <br>
- The icons used on the page were taken from fontawesome.com: https://fontawesome.com/icons
- Video tutorial used for implementing the chat feature: https://www.youtube.com/watch?v=NlXfg5Pxxh8&t=4627s 
(we extended it by the GitHub and credentials provider authentication and some further front-end enhancements)
  

