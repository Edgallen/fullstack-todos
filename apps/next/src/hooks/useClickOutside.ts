"use client";

import { RefObject, useCallback, useEffect } from "react";

const triggerEvent = "click";

const useClickOutside = (
    ref: RefObject<any>,
    callback: (e: MouseEvent) => void,
) => {
    const handleClick = useCallback( (e: MouseEvent): void => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback(e);
        }
    }, [callback, ref]);

    useEffect(() => {
        document.addEventListener(triggerEvent, handleClick);
        return () => {
            document.removeEventListener(triggerEvent, handleClick);
        };
    }, [handleClick]);
};

export default useClickOutside;
