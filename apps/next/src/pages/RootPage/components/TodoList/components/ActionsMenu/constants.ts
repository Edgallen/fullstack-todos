import db from "@database/prisma";

import { deleteTodo, updateTodoStatus } from "@/api/todos/actions";

import type { TIconType } from "@/components/Icon/interfaces";

interface IMenuActions {
    title: string;
    icon?: TIconType;
    statusShowCondition?: db.Status;
    className?: string;
    onClick: (...args: any) => {}
}

export const menuActions: IMenuActions[] = [
    {
        title: "Take in Work",
        icon: "briefcase",
        statusShowCondition: db.Status.NEW,
        onClick: (id: number) => updateTodoStatus(id, db.Status.IN_WORK)
    },
    {
        title: "Mark as Done",
        icon: "circleCheck",
        statusShowCondition: db.Status.IN_WORK,
        onClick: (id: number) => updateTodoStatus(id, db.Status.DONE)
    },
    {
        title: "Delete",
        icon: "trash",
        className: "text-red-500",
        onClick: (id: number) => deleteTodo(id)
    },
];
