"use client";

import React, { useActionState } from "react";
import Link from "next/link";

import InputField from "@/components/InputField";
import AuthForm from "@/components/AuthForm/AuthForm";

import { register } from "@/api/auth/actions";

import type { IAuthFormState, IRegisterAuthErrors } from "@/api/auth/definitions";

const initialSate: IAuthFormState<IRegisterAuthErrors> = {
    errors: {}
} as const;

const Page = () => {
    const [state, dispatch] = useActionState(register, initialSate);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <AuthForm
                title='Create Account'
                buttonTitle='Create account'
                dispatch={dispatch}
            >
                <InputField
                    title="username"
                    label="Username"
                    error={state?.errors?.username?.[0]}
                    autoComplete="username"
                    isRequired={true}
                />

                <InputField
                    title="password"
                    label="Password"
                    inputType="password"
                    error={state?.errors?.password?.[0]}
                    isRequired={true}
                />

                <InputField
                    title="confirm"
                    label="Confirm Password"
                    inputType="password"
                    error={state?.errors?.confirm?.[0]}
                    isRequired={true}
                />
            </AuthForm>

            <p className="mt-10 text-center text-sm text-gray-500">
                Already have account?{" "}

                <Link
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    href="/login"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default Page;
