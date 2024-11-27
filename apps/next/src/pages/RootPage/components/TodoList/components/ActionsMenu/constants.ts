import { Status } from "@prisma/client";

import { deleteTodo, updateTodoStatus } from "@/api/todos/actions";

import type { TIconType } from "@/components/Icon/interfaces";

interface IMenuActions {
    title: string;
    icon?: TIconType;
    statusShowCondition?: Status;
    className?: string;
    onClick: (...args: any) => {}
}

export const menuActions: IMenuActions[] = [
    {
        title: "Take in Work",
        icon: "briefcase",
        statusShowCondition: Status.NEW,
        onClick: (id: number) => updateTodoStatus(id, Status.IN_WORK)
    },
    {
        title: "Mark as Done",
        icon: "circleCheck",
        statusShowCondition: Status.IN_WORK,
        onClick: (id: number) => updateTodoStatus(id, Status.DONE)
    },
    {
        title: "Delete",
        icon: "trash",
        className: "text-red-500",
        onClick: (id: number) => deleteTodo(id)
    },
];
