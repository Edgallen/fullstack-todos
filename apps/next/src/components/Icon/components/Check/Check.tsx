'use client'

import {FC, memo} from 'react';

import type {IIconProps} from "@/components/Icon/interfaces";

const Plus: FC<IIconProps> = ({
    className,
    width,
    height
}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
         className={className}
    >
        <path d="M20 6 9 17l-5-5"/>
    </svg>
);

export default memo(Plus);
