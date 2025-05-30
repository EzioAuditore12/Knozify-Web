import {z} from 'zod'
import { registerSchema } from '../schema/registerSchema'

type registerUserObjectProps=z.infer<typeof registerSchema>

export const registerUserObject={
    username:"",
    password:"",
    first_name:"",
    last_name:"",
    contact:"",
    birth_date:"",
    otp:""
} as registerUserObjectProps