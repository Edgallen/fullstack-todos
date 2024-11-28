"use client";

import { FC } from "react";

import { icons } from "./constants";

import type { IIconProps, TIconType } from "./interfaces";

interface IProps extends IIconProps {
    type: TIconType
}

const Icon: FC<IProps> = ({
    type,
    ...props
}) => {
    const CurrentIcon = icons[type];

    return (
        <CurrentIcon {...props} />
    );
};

export default Icon;
