'use client'

import {FC} from "react";
import {cn} from "@/lib/utils";
import {Status} from "@prisma/client";

import {titleByStatusMap} from "@/pages/RootPage/constants";

interface IProps {
    status: Status
}

const StatusBadge: FC<IProps> = ({ status }) => (
    <span
        className={cn("inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset", {
            'bg-purple-50 text-purple-700 ring-purple-700': status === Status.NEW,
            'bg-indigo-50 text-indigo-700 ring-indigo-700': status === Status.IN_WORK,
            'bg-green-50 text-green-700 ring-green-600': status === Status.DONE,
        })}
    >
        {titleByStatusMap[status]}
    </span>
);

export default StatusBadge;
