

## Way Home
## Find the safest route to your desired destination

We're not just another navigation app. We're a safety-first solution dedicated to empowering you to
feel secure during your journeys. With WayHome, you can embark on adventures, explore new cities, and navigate through unfamiliar 
territories with confidence!

### How to Setup and Run

In order to set up the project, please proceed as follows:

1 Download node.js, and install the npm package manager
2. Download VS Code and Git (For a more detailed description of setting up GitHub and VS Code use the respective guide in  our ClickUp documentation)

After successful installation you have to go through the following steps to run the project:
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
These environment variables are neccessary for the connection to the database, the use of Google and Github OAuth 2 and partly finished real time functionality for sending and receving friend requests. 
For safety reasons they are only stored locally and cannot be pushed to the Github repository
7. Open the terminal and and use the command line: "npm run dev"
8. Open the following link http://localhost:3000/ in your browser. Now you should be able to see the web application and use its features 

### Examples
#Authentication
Google and Github OAuth 2
1. Navigate to the sign in page
2. Click on the "Sign in with GitHub" or "Sign in with Google" button

 **The Authentication flow for GitHub goes as follows:**   
A click on the Sign in with GitHub button triggers this function:

/app/signin/page.tsx
```typecript
async function loginWithGithub() {
    setIsLoadingGitHub(true) // replace provider icon with spinning loading icon 
    try{
      await signIn('github') // initiate provider authentication process
    }catch(error) {
      toast.error(`Sign in failed: ${error}`) //provide feedback on the authentication process if there is an error
    } 
  }
```
When the provider authentication process becomes initiated the api endpoint: "pages/api/auth/[...nextauth.ts] gets called that uses the authOptions constant saved under:
/lib/auth.ts

```typescript
export const authOptions: NextAuthOptions = { 
    adapter: UpstashRedisAdapter(db), //configure aithentication adapter
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
      ...
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

```


### Roadmap

1. **Landing page** - Since  the data science team was looking for useful data sources at the begnning one of the first steps for the web dev team was to create an enticing landing page to encourage new users to sign in and use the app.
2. **Connection to the google maps API** - to implement the core app features like route recommendations we had to access the google maps API. Since all our data scientists have dropped out of the programm we didn't use
    it for anything other than displaying it on the user dashboard
3. **Authentication** - we used next auth to create the user accounts with session which are neccessary for the other app features
   Our app includes 3 possible authentication methods:
   - GitHub OAuth 2
   - Google OAuth 2
   - Credential Provider (Standard authentication by creating a user account consisting of username, email and password) 
4. **Chat feature** - Currently the most complex feature of our application it consists of:
   - User dashboard with sign out function
   - Sending, receiving, viewing and denying friend requests
   - Sending and receiving text messages 

   
Please **fill out the following information below**, as soon as possible. It is **required** to have this file completely filled out and up to date at the end of the project phase.
You can of course use this file to manage your project, e.g. as a place to keep your todos and to plan your features. Also, feel free to edit this readme in any kind of way you like, but the required base layout and information should be consistent throughout all techie projects.

**Hint:** The following file is written in `markdown` which is a language to format text with simple characters. If you are unsure on how to use markdown then have a look at [this guide](https://www.markdownguide.org/basic-syntax/)

By the end you should have filled out the following:
1. **Project Title:** The title of the project, including a description which states the motivation/problem of the project and the developed solution.
2. **How to Setup and Run:** The respective commands to install and run the project
3. **Examples:** A brief overview on how to use the main functionalities of your project. This does not have to be code but can also be screenshots or a video.
4. **Roadmap:** The general outline of what you want to do in what order. Please keep this up to date, so that we can follow what you are and will be doing.
5. **Authors:** Please add all of you and link your respective GitHub profile and other information if you want to. This part if completely up to you.
6. If you are done filling out the information below, please **delete this TODO Section** to keep your project readme clean for other people to get to know more about your project.

# Way Home




## Examples

You can see a brief overview of how to use the main functionality below

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```

  
  
### Authors

- [@Mariusz Seget]([https://www.github.com/bob](https://github.com/Isztof))
- [@Lukas Jazwinski](https://github.com/Lumpays)

### Credits
Next, Typescript, Tailwind template used for the landing page sign up and sign in: https://github.com/cruip/open-react-template 
Video toturial used for implementing the chat feature: https://www.youtube.com/watch?v=NlXfg5Pxxh8&t=4627s 
(we extended it by the GitHub and credentials provider authentication and some further front end features)
  

