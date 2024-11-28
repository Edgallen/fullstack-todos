"use client";

import React, { FC, HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from "react";

interface IProps {
    label: string;
    title: string;
    error?: string;
    inputType?: HTMLInputTypeAttribute
    autoComplete?: HTMLInputAutoCompleteAttribute;
    isRequired?: boolean;
}

const InputField: FC<IProps> = ({
    title,
    label,
    error,
    inputType = "text",
    autoComplete,
    isRequired
}) => (
    <div>
        <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">
            {label}
        </label>

        <div className="relative mt-2 mb-2">
            <input
                id={title}
                name={title}
                type={inputType}
                autoComplete={autoComplete}
                required={isRequired}
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            {error && (
                <span className="absolute -bottom-6 text-sm text-red-500">
                    {error}
                </span>
            )}
        </div>
    </div>
);

export default InputField;
