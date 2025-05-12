import { z } from "zod"

export const profileSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" }),

    email: z
        .string()
        .email({ message: "Invalid email address" })
});
