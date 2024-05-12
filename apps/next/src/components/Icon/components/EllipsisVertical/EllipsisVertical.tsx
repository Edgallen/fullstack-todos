'use client'

import {FC, memo} from 'react';

import type {IIconProps} from "@/components/Icon/interfaces";

const EllipsisVertical: FC<IIconProps> = ({
    className,
    width,
    height
}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"
         className={className}
    >
        <circle cx="12" cy="12" r="1"/>
        <circle cx="12" cy="5" r="1"/>
        <circle cx="12" cy="19" r="1"/>
    </svg>
);

export default memo(EllipsisVertical);
