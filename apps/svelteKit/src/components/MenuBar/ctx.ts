import { getContext, setContext } from "svelte";
import { readable, writable } from "svelte/store";

import type { Readable, Writable } from "svelte/store";

type TMenuState = boolean
type TTriggerIdState = string

interface IMenuCtx {
    menuState: Writable<TMenuState>
    menuTriggerId: Readable<TTriggerIdState>
}

export const initCtx = (initialMenuState = false) => {
    const menuState = writable<TMenuState>(initialMenuState);
    const menuTriggerId = readable<TTriggerIdState>(`menu-trigger-${crypto.randomUUID()}`);

    setContext<IMenuCtx>("actionMenu", {
        menuState,
        menuTriggerId
    });
};

export const getMenuStateCtx = () => getContext<IMenuCtx>("actionMenu");
