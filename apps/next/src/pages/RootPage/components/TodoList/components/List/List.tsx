'use client'

import {FC} from "react";
import {cn} from "@/lib/utils";
import {Prisma, Status} from "@prisma/client";

import StatusBadge from "../StatusBadge/StatusBadge";
import CircleCheck from "../CircleCheck/CircleCheck";
import ActionsMenu from "../ActionsMenu/ActionsMenu";

interface IProps {
    todos: Prisma.TodoGetPayload<null>[]
}

const List: FC<IProps> = ({ todos }) => (
    <ul className="flex flex-col gap-4 mt-4 pb-10">
        {todos.map(({ id, text, status }) => (
            <li
                key={id}
                className="flex items-center justify-between border px-4 h-20 rounded-md border-gray-300 shadow-sm"
            >
                <div className="flex items-center">
                    <CircleCheck status={status} />

                    <div className="flex flex-col gap-1 items-start">
                        <span
                            className={cn("text-gray-900", {
                                'line-through': status === Status.DONE
                            })}
                        >
                            {text}
                        </span>

                        <StatusBadge status={status} />
                    </div>
                </div>

                <ActionsMenu
                    id={id}
                    status={status}
                />
            </li>
        ))}
    </ul>
);

export default List;
