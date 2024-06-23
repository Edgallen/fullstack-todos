<script lang="ts">
    import {icons} from "./constants";

    import type {TIconType} from "$components/Icon/interfaces";
    import type {ComponentType} from "svelte";

    let className: string | undefined | null = undefined;

    export let type: TIconType;
    export let width: number;
    export let height: number;
    export { className as class };


    let currentIcon: ComponentType = icons[type]
</script>

<svelte:component
    this={currentIcon}
    class={className}
    width={width}
    height={height}
/>
