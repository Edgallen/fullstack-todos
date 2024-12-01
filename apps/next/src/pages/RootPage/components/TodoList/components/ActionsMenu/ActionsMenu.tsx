"use client";

import { FC } from "react";
import db from "@database/prisma";

import Icon from "@/components/Icon/Icon";
import { Menubar, MenubarContent, MenubarItem, MenubarTrigger } from "@/components/Menubar/Menubar";

import { menuActions } from "./constants";

interface IProps {
    id: number
    status: db.Status;
}

const ActionsMenu: FC<IProps> = ({
    id,
    status
}) => (
    <Menubar>
        <MenubarTrigger>
            <Icon
                type="ellipsisVertical"
                height={18}
                width={18}
            />
        </MenubarTrigger>

        <MenubarContent>
            {menuActions.map(({
                title,
                icon,
                className,
                statusShowCondition,
                onClick
            }, index) => {
                if (statusShowCondition && statusShowCondition !== status) {
                    return null;
                }

                return (
                    <MenubarItem
                        key={index}
                        className={className}
                        onClick={() => onClick(id)}
                    >
                        {icon && (
                            <Icon
                                type={icon}
                                height={16}
                                width={16}
                            />
                        )}

                        <span>{title}</span>
                    </MenubarItem>
                );}
            )}
        </MenubarContent>
    </Menubar>
);

export default ActionsMenu;
