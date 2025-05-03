import { z } from "zod"

export const verificationCodeSchema = z.object({
    code: z.string()
        .min(6, "Verification code must be 6 digits")
        .regex(/^\d{6}$/, "Code must contain only digits"),
});
