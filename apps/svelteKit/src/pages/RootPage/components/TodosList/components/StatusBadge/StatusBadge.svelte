<script lang="ts">
    import db from "@database/prisma";
    import {cn} from "$lib/utils";

    import {titleByStatusMap} from "$pages/RootPage/constants";

    export let status: db.Status
</script>

<span
    class={cn("inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset", {
        'bg-purple-50 text-purple-700 ring-purple-700': status === db.Status.NEW,
        'bg-indigo-50 text-indigo-700 ring-indigo-700': status === db.Status.IN_WORK,
        'bg-green-50 text-green-700 ring-green-600': status === db.Status.DONE
    })}
>
    {titleByStatusMap[status]}
</span>
