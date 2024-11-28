"use client";

import { FC, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { statuses, statusesMap, titleByStatusMap, TStatusesMap } from "@/pages/RootPage/constants";

const StatusSelector: FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const selectedStatus = searchParams?.get("status");

    const onStatusChange = useCallback((newStatus: TStatusesMap) => {
        const params = new URLSearchParams(String(searchParams));
        params.set("status", newStatus);

        router.push(pathname + "?" + String(params));
    }, [pathname, router, searchParams]);

    useEffect(() => {
        const isStatusSelected = !statuses.includes(selectedStatus as TStatusesMap);

        if (isStatusSelected) {
            onStatusChange(statusesMap.ALL);
        }
    }, [onStatusChange, selectedStatus]);

    return (
        <div className="flex w-full h-10 mt-4 border border-gray-300 shadow-sm rounded-md">
            {statuses.map((status, index) => (
                <button
                    key={index}
                    className={cn("text-center text-gray-900 w-1/4 cursor-pointer rounded-md", {
                        "text-white font-medium bg-indigo-600 text-bold": status === selectedStatus,
                    })}
                    onClick={() => onStatusChange(status)}
                >
                    {titleByStatusMap[status]}
                </button>
            ))}
        </div>
    );
};

export default StatusSelector;
