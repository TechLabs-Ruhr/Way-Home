import { db } from "@/lib/db";
import { z } from "zod";
var bcrypt = require('bcryptjs');

const { v4: uuidv4 } = require('uuid');


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
