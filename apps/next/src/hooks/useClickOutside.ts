'use client'

import {MutableRefObject, useEffect} from "react";

const triggerEvent = 'click';

const useClickOutside = (
    ref: MutableRefObject<any>,
    callback: (e: MouseEvent) => void,
) => {
    const handleClick = (e: MouseEvent): void => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback(e);
        }
    };

    useEffect(() => {
        document.addEventListener(triggerEvent, handleClick);
        return () => {
            document.removeEventListener(triggerEvent, handleClick);
        };
    });
}

export default useClickOutside
