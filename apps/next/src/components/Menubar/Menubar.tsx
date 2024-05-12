'use client'

import {
    createContext,
    Dispatch,
    FC,
    PropsWithChildren,
    SetStateAction,
    useCallback,
    useContext,
    useRef,
    useState
} from "react";
import {cn} from "@/lib/utils";

import useClickOutside from "@/hooks/useClickOutside";

interface IMenubarContext {
    isMenuOpen: boolean,
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}
const MenuBarContext = createContext<IMenubarContext | null>(null)

export const Menubar: FC<PropsWithChildren> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className="flex flex-col gap-24 relative items-center">
            <MenuBarContext.Provider value={{
                isMenuOpen,
                setIsMenuOpen
            }}>
                {children}
            </MenuBarContext.Provider>
        </div>
    )
};

interface IMenubarTriggerProps {
    className?: string;
}

export const MenubarTrigger: FC<PropsWithChildren<IMenubarTriggerProps>> = ({
    className,
    children
}) => {
    const context = useContext(MenuBarContext)

    return (
        <button
            className={cn("text-gray-900 p-2 rounded-md hover:bg-gray-300/20", className)}
            onClick={() => context?.setIsMenuOpen(prevState => !prevState)}
        >
            {children}
        </button>
    )
}

interface IMenuClickOutsideWrapperProps {
    className?: string
}

const MenuClickOutsideWrapper: FC<PropsWithChildren<IMenuClickOutsideWrapperProps>> = ({
    className,
    children
}) => {
    const context = useContext(MenuBarContext)

    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback(() => {
        context?.setIsMenuOpen(false)
    }, [context])

    useClickOutside(ref, handleClickOutside)

    return (
        <div
            ref={ref}
            className={cn("absolute flex bg-white right-0 top-10 flex-col w-40 p-1 border border-gray-300 rounded z-10", className)}
        >
            {children}
        </div>
    )
}

export const MenubarContent: FC<PropsWithChildren<IMenuClickOutsideWrapperProps>> = ({
    className,
    children
}) => {
    const context = useContext(MenuBarContext)

    if (!context?.isMenuOpen) {
        return null
    }

    return (
        <MenuClickOutsideWrapper className={className}>
            {children}
        </MenuClickOutsideWrapper>
    )
}

interface IMenubarItemProps {
    className?: string
    onClick?: (...args: any) => {}
}

export const MenubarItem: FC<PropsWithChildren<IMenubarItemProps>> = ({
    className,
    onClick = () => {},
    children
}) => {
    const context = useContext(MenuBarContext)

    const onCLickHandler = () => {
        onClick()
        context?.setIsMenuOpen(false)
    }

    return (
        <button
            className={cn("flex gap-2 p-1 items-center text-gray-900 cursor-pointer rounded hover:bg-gray-300/20", className)}
            onClick={onCLickHandler}
        >
            {children}
        </button>
    )
}
