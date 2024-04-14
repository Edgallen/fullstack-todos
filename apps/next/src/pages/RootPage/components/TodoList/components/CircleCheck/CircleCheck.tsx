'use client'

import {FC} from "react";
import {cn} from "@/lib/utils";
import {Status} from "@prisma/client";

import Icon from "@/components/Icon/Icon";

interface IProps {
    status: Status
}

const CircleCheck: FC<IProps> = ({ status }) => {
    const isTodoDone = status === Status.DONE

    return (
        <div
            className={cn("flex items-center justify-center h-8 w-8 mr-4 border border-gray-300 rounded-full", {
                'border-green-700': isTodoDone
            })}
        >
            {isTodoDone && (
                <Icon
                    className="text-green-700"
                    type="check"
                    width={20}
                    height={20}
                />
            )}
        </div>
    );
};

export default CircleCheck;
