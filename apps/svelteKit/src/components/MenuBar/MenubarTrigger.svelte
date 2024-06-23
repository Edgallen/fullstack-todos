<script lang="ts">
    import {cn} from "$lib/utils";

    import {getMenuStateCtx} from "$components/MenuBar/ctx";

    let className: string | undefined | null = undefined;
    export { className as class };

    const { menuState, menuTriggerId } = getMenuStateCtx()

    const updateState = () => {
        $menuState = !$menuState
    }
</script>

<button
    class={cn("text-gray-900 p-2 rounded-md hover:bg-gray-300/20", className)}
    id={$menuTriggerId}
    on:click={updateState}
>
    <slot />
</button>
