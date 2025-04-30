import { z } from "zod"

export const signupSchema = z.object({
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .min(5, { message: "Email must be at least 5 characters long" })
        .max(100, { message: "Email must not exceed 100 characters" }),
    
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(50, { message: "Password must not exceed 50 characters" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[@$!%*?&#]/, { message: "Password must contain at least one special character" }),
});
