import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
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

    db.sadd(
        `name:${firstName} ${lastName}`,
        `email:${email}`,
        'image:null',
        'emailVerified:null',
        `password:${password}`,
        `id:${uuidv4()}`
      );
          
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
