'use client'


import React, {FC, PropsWithChildren} from "react";

interface IProps {
    title: string;
    buttonTitle: string;
    dispatch: (payload: FormData) => void
}

const AuthForm: FC<PropsWithChildren<IProps>>  = ({
    title,
    buttonTitle,
    dispatch,
    children
}) => (
    <>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                {title}
            </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
                className="flex flex-col gap-6"
                action={dispatch}
            >
                {children}

                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {buttonTitle}
                    </button>
                </div>
            </form>
        </div>
    </>
);

export default AuthForm;
