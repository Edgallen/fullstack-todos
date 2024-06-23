'use client'

import React from 'react';
import { useFormState } from 'react-dom';
import Link from "next/link";

import InputField from "@/components/InputField";
import AuthForm from "@/components/AuthForm";

import {logIn, SignInAsTestUser} from "@/api/auth/actions";

import type {IAuthFormState} from "@/api/auth/definitions";

const initialSate: IAuthFormState = {
    errors: {}
} as const

const Page = () => {
    const [state, dispatch] = useFormState(logIn, initialSate)

    const onTestUserSignInHandler = async () => {
        await SignInAsTestUser()
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <AuthForm
                title='Sign in to your account'
                buttonTitle='Sign in'
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
                    autoComplete="current-password"
                    isRequired={true}
                />
            </AuthForm>

            <div className="flex flex-col gap-6 items-center">
                <p className="mt-10 text-center text-sm text-gray-500">
                    Don`t have account yet?{' '}

                    <Link
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        href="/register"
                    >
                        Create
                    </Link>
                </p>

                <button
                    className="bg-indigo-600 text-white px-3 py-1.5 text-sm font-semibold rounded-md"
                    onClick={onTestUserSignInHandler}
                >
                    Sign in as test user
                </button>
            </div>
        </div>
    );
};

export default Page;
