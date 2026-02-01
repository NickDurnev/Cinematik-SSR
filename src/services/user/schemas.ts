import * as z from "zod";

const passwordSchema = z
  .string({
    required_error: "Password is required",
  })
  .trim()
  .min(8, "Password must be at least 8 characters")
  .max(32, "Password must be less than 32 characters")
  .refine(
    value =>
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value),
    {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    },
  );

const nameSchema = z
  .string({
    required_error: "Name is required",
  })
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(40, "Name must be less than 40 characters");

const emailSchema = z
  .string({
    required_error: "Email is required",
  })
  .trim()
  .refine(
    value => /.+@.+\..+/.test(value ?? ""),
    "Email should be a valid email address",
  );

export const signupFormSchema = z
  .object({
    name: nameSchema,
    password: passwordSchema,
    confirmPassword: z.string({
      required_error: "Please confirm your password",
    }),
    email: emailSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const forgotPasswordFormSchema = z.object({
  email: emailSchema,
});

export const resetPasswordFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string({
      required_error: "Please confirm your password",
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ISignupFormSchema = z.infer<typeof signupFormSchema>;
export type ILoginFormSchema = z.infer<typeof loginFormSchema>;
export type IForgotPasswordFormSchema = z.infer<
  typeof forgotPasswordFormSchema
>;
export type IResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;
