import { z } from "zod"

export const resetPasswordSchema = z.object({
    code: z.string()
        .min(6, "Verification code must be 6 digits")
        .regex(/^\d{6}$/, "Code must contain only digits"),
    
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(50, { message: "Password must not exceed 50 characters" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[@$!%*?&#]/, { message: "Password must contain at least one special character" }),
});
