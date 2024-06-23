import React from 'react';
import {useFormStatus} from "react-dom";

import Icon from "@/components/Icon/Icon";

const SubmitButton = () => {
    const { pending } = useFormStatus()

    return (
        <button
            className="flex items-center justify-center gap-1 size-full w-28 h-full text-2xl text-white bg-indigo-600 shadow-sm rounded-r-md hover:bg-indigo-500 disabled:bg-gray-500 disabled:cursor-progress"
            type="submit"
            disabled={pending}
        >
            <Icon
                type='plus'
                className="text-white"
                height={20}
                width={20}
            />

            <span className="text-xl">Add</span>
        </button>
    );
};

export default SubmitButton;
