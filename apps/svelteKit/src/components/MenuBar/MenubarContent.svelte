<script lang="ts">
    import MenuClickOutsideWrapper from "./MenuClickOutsideWrapper.svelte";

    import {getMenuStateCtx} from "./ctx";

    let className: string | undefined | null = undefined;
    export { className as class };

    const { menuState } = getMenuStateCtx()
</script>

{#if $menuState}
    <MenuClickOutsideWrapper class={className}>
        <slot />
    </MenuClickOutsideWrapper>
{/if}
