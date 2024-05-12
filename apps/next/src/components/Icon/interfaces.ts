import {icons} from "@/components/Icon/constants";

export type TIconType = keyof typeof icons

export interface IIconProps {
    className?: string
    height: number;
    width: number;
}
