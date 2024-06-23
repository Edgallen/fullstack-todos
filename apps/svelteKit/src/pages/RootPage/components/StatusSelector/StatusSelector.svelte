<script lang="ts">
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import { page } from '$app/stores';
    import {cn} from "$lib/utils";

    import {statuses, statusesMap, titleByStatusMap, type TStatusesMap} from "$pages/RootPage/constants";

    import { statusQuery } from '../../stores'

    let queryParams = $page.url.searchParams;

    const onStatusChange = (newStatus: TStatusesMap) => {
        statusQuery.set(newStatus)
        queryParams.set('status', newStatus)

        goto(`?${String(queryParams)}`)
    }

    onMount(() => {
        const isStatusSelected = !statuses.includes($statusQuery as TStatusesMap);

        if (isStatusSelected) {
            onStatusChange(statusesMap.ALL)
        }
    })
</script>

<div class="flex w-full h-10 mt-4 border border-gray-300 shadow-sm rounded-md">
    {#each statuses as status (status)}
        <button
            class={cn("text-center text-gray-900 w-1/4 cursor-pointer rounded-md", {
                'font-medium bg-indigo-600 text-bold text-white': status === $statusQuery,
            })}
            on:click={() => onStatusChange(status)}
        >
            {titleByStatusMap[status]}
        </button>
    {/each}
</div>
