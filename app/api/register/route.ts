import { db } from "@/lib/db";
import { z } from "zod";
var bcrypt = require('bcryptjs');

const { v4: uuidv4 } = require('uuid');


const registerUserSchema = z.object({
  firstName: z.string().regex(/^[a-z ,.'-]+$/i, 'invalid first name'),
  lastName: z.string().regex(/^[a-z ,.'-]+$/i, 'invalid last name'),
  email: z.string().email(),
  password: z.string().min(5, 'Password should have at least 5 characters'),
})

  
  

export  async function POST(req: Request) {
    try {
      const body =  await req.json()
      const formData = registerUserSchema.parse(body);
      const { firstName, lastName, email, password } = formData;

      //hashing the password 
      const hashedPassword =  await bcrypt.hash(password, 10)

      const userDataValidation  = {
        firstName,
        lastName,
        email,
        image: "/images/human-icon.jpg",
        emailVerified: null,
        password: hashedPassword,
        id: uuidv4(),
      };

      const userDataCallbacks  = {
        name: firstName + " " + lastName,
        email,
        image: "/images/human-icon.jpg",
        emailVerified: null,
        id: userDataValidation.id,
      };

      // Convert the user data object to a JSON string
      const userDataValidationJSON = JSON.stringify(userDataValidation);
      const userDataCallbacksJSON = JSON.stringify(userDataCallbacks);
      
      // Store the JSON string in Redis needed for sign in validation
      await db.set(`user:${userDataValidation.email}`, userDataValidationJSON);

      // Store a JSON string in Redis needed in the callbacks section of the auth options 
      await db.set(`user:${userDataValidation.id}`, userDataCallbacksJSON);      
      
      // Store a JSON string in Redis that is required for receiving friend requests
      await db.set(`user:email:${userDataValidation.email}`, userDataValidation.id); 

      return new Response("OK")
    } catch(error) {
        console.error('Error: ', error)
         // Handle validation errors
        if (error instanceof z.ZodError) {
            return new Response('Invalid request payload')
      } else {
        return new Response('Invalid request payload', {status: 422})
      }
    }
}
