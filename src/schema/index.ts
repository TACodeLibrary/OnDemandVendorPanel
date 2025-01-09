import { z } from 'zod';

export const LoginFormSchema = z.object({
    email: z.string({
        required_error: 'Email is required'
    })
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: z.string({
        required_error: 'Password is required'
    })
        .min(1, { message: "Password is required" }),
});

export const FindAccountSchema = z.object({
    email: z.string({
        required_error: 'Email is required'
    })
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
});

export const ResetPasswordSchema = z.object({
    newPassword: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z
        .string(),
}).superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmPassword) {
        ctx.addIssue({
            path: ['confirmPassword'],
            message: 'Passwords do not match',
            code: z.ZodIssueCode.custom,
        });
    }
});