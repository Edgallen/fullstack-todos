<script lang="ts">
    import {cn} from "$lib/utils";

    let className: string | undefined | null = undefined;
    export { className as class };
</script>

<button
    class={cn("flex w-full gap-2 p-1 items-center text-gray-900 cursor-pointer rounded hover:bg-gray-300/20", className)}
    on:click
>
    <slot />
</button>
