<script lang="ts">
    import {cn} from "$lib/utils";

    import {clickOutside} from '$constants/clickOutside'
    import {getMenuStateCtx} from "./ctx";

    let className: string | undefined | null = undefined;
    export { className as class };

    const { menuState, menuTriggerId } = getMenuStateCtx()

    const onClickOutside = () => {
        $menuState = false
    }
</script>

<div
    class={cn("absolute flex bg-white right-0 top-10 flex-col w-40 p-1 border border-gray-300 rounded z-10", className)}
    use:clickOutside={`#${$menuTriggerId}`}
    on:click_outside={onClickOutside}
>
    <slot />
</div>
