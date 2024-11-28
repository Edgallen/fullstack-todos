"use client";

import { FC, memo } from "react";

import type { IIconProps } from "@/components/Icon/interfaces";

const CircleCheck: FC<IIconProps> = ({
    className,
    width,
    height
}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"
         className={className}
    >
        <circle cx="12" cy="12" r="10"/>
        <path d="m9 12 2 2 4-4"/>
    </svg>
);

export default memo(CircleCheck);
