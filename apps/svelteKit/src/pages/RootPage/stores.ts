import {writable} from "svelte/store";

export const createStatusStore = () => {
    const { subscribe, set } = writable<string | null>(null);

    return {
        subscribe,
        set: (newQuery: string) => set(newQuery)
    }
}

export const statusQuery = createStatusStore()
