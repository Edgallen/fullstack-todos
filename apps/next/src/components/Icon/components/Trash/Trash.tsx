'use client'

import {FC, memo} from 'react';

import type {IIconProps} from "@/components/Icon/interfaces";

const Trash: FC<IIconProps> = ({
    className,
    width,
    height
}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"
         className={className}
    >
        <path d="M3 6h18"/>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    </svg>
);

export default memo(Trash);
