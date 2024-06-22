'use client'

import {FC, useRef} from "react";
import {useFormState} from "react-dom";
import {cn} from "@/lib/utils";

import {createTodo} from "@/api/todos/actions";

import type {ITodoFormState} from "@/api/todos/definitions";
import Icon from "@/components/Icon/Icon";

const initialState: ITodoFormState = {
    errors: {},
} as const

const InputForm: FC = () => {
    const [state, dispatch] = useFormState(createTodo, initialState)

    const formRef = useRef<HTMLFormElement>(null);

    const isEmptyInput = Boolean(state?.errors?.text)

    return (
        <>
            <form
                ref={formRef}
                className="flex h-12"
                action={(formData) => {
                    dispatch(formData)
                    formRef?.current?.reset()
                }}
            >
                <input
                    id="text"
                    name="text"
                    placeholder="Add a new task"
                    className={cn("block w-full rounded-l-md border-1 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 sm:text-sm sm:leading-6", {
                        'ring-red-500': isEmptyInput
                    })}
                    autoComplete="off"
                />

                {/* TODO: Дизейблить во время загрузки */}
                <button
                    className="flex items-center justify-center gap-1 size-full w-28 h-full text-2xl text-white bg-indigo-600 shadow-sm rounded-r-md hover:bg-indigo-500 disabled:bg-gray-500 disabled:cursor-progress"
                    type="submit"
                >
                    <Icon
                        type='plus'
                        className="text-white"
                        height={20}
                        width={20}
                    />

                    <span className="text-xl">Add</span>
                </button>
            </form>

            {isEmptyInput && (
                <span className="text-sm text-red-500 mt-2">
                    {state.errors!.text}
                </span>
            )}
        </>
    );
};

export default InputForm;
