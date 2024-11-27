import { z } from "zod";

export interface IAuthErrors {
    username?: string[];
    password?: string[];
}

export interface IRegisterAuthErrors extends IAuthErrors {
    confirm?: string[];
}

export interface IAuthFormState<T = IAuthErrors> {
    username: string;
    password: string;
    confirm?: string;
    errors?: T;
}

export const AuthFormSchema = z.object({
    username: z.coerce.string().min(1),
    password: z.coerce.string().min(4),
});

export const RegisterAuthFormSchema = AuthFormSchema.extend({
    confirm: z.coerce.string().min(4)
}).refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"]
});
