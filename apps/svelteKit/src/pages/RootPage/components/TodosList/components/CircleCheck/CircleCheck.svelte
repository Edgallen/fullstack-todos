<script lang="ts">
    import db from "@database/prisma";
    import {cn} from "$lib/utils";

    import Icon from "$components/Icon/Icon.svelte";

    export let status: db.Status;

    $: isTodoDone = status === db.Status.DONE;
</script>

<div
    class={cn("flex items-center justify-center h-8 w-8 mr-4 border border-gray-300 rounded-full", {
        'border-green-700': isTodoDone
    })}
>
    {#if isTodoDone}
        <Icon
            class="text-green-700"
            type="check"
            width={20}
            height={20}
        />
    {/if}
</div>
