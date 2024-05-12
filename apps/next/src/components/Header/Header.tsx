'use client'

import {FC} from "react";

import {Menubar, MenubarContent, MenubarItem, MenubarTrigger} from "@/components/Menubar/Menubar";
import Icon from "@/components/Icon/Icon";

import {logOut} from "@/api/auth/actions";

interface IProps {
    username: string;
}

const Header: FC<IProps> = ({ username }) => (
    <header className="flex h-20 w-full items-center justify-end px-8">
        <Menubar>
            <MenubarTrigger
                className="flex text-white size-12 items-center justify-center text-xl font-medium bg-indigo-600 rounded-full hover:bg-indigo-600"
            >
                {username[0].toUpperCase()}
            </MenubarTrigger>

            <MenubarContent className="top-14">
                <MenubarItem
                    className="text-red-500"
                    onClick={async () => logOut()}
                >
                    <Icon
                        type='logOut'
                        height={16}
                        width={16}
                    />

                    <span>Log out</span>
                </MenubarItem>
            </MenubarContent>
        </Menubar>
    </header>
)

export default Header;
