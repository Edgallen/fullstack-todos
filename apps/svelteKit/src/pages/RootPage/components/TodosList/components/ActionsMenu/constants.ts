import { Status } from "@prisma/client";

import type { TIconType } from "$components/Icon/interfaces";

interface IMenuActions {
    title: string;
    icon?: TIconType;
    statusShowCondition?: Status;
    statusToTransition?: Status;
    className?: string;
    action: string;
}

export const menuActions: IMenuActions[] = [
    {
        title: "Take in Work",
        icon: "briefcase",
        statusShowCondition: Status.NEW,
        statusToTransition: Status.IN_WORK,
        action: `?/updateTodo`
    },
    {
        title: "Mark as Done",
        icon: "circleCheck",
        statusShowCondition: Status.IN_WORK,
        statusToTransition: Status.DONE,
        action: `?/updateTodo`
    },
    {
        title: "Delete",
        icon: "trash",
        className: "text-red-500",
        action: "?/deleteTodo"
    },
];
