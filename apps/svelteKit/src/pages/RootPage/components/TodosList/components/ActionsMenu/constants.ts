import db from "@database/prisma";

import type { TIconType } from "$components/Icon/interfaces";

interface IMenuActions {
    title: string;
    icon?: TIconType;
    statusShowCondition?: db.Status;
    statusToTransition?: db.Status;
    className?: string;
    action: string;
}

export const menuActions: IMenuActions[] = [
    {
        title: "Take in Work",
        icon: "briefcase",
        statusShowCondition: db.Status.NEW,
        statusToTransition: db.Status.IN_WORK,
        action: `?/updateTodo`
    },
    {
        title: "Mark as Done",
        icon: "circleCheck",
        statusShowCondition: db.Status.IN_WORK,
        statusToTransition: db.Status.DONE,
        action: `?/updateTodo`
    },
    {
        title: "Delete",
        icon: "trash",
        className: "text-red-500",
        action: "?/deleteTodo"
    },
];
