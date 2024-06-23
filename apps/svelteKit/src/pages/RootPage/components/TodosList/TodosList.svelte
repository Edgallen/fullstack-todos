<script lang="ts">
    import {Prisma, Status} from "@prisma/client";
    import {cn} from "$lib/utils";

    import CircleCheck from "./components/CircleCheck/CircleCheck.svelte";
    import StatusBadge from "./components/StatusBadge/StatusBadge.svelte";
    import ActionsMenu from "./components/ActionsMenu/ActionsMenu.svelte";

    export let todos: Prisma.TodoGetPayload<null>[] | null = null
</script>

<ul class="flex flex-col gap-4 mt-4 pb-10">
    {#if todos}
        {#each todos as { id, text, status } (id)}
            <li
                class="flex items-center justify-between border px-4 h-20 rounded-md border-gray-300 shadow-sm"
            >
                <div class="flex items-center">
                    <CircleCheck status={status} />

                    <div class="flex flex-col gap-1 items-start">
                        <span
                            class={cn("text-gray-900", {
                                'line-through': status === Status.DONE
                            })}
                        >
                            {text}
                        </span>

                        <StatusBadge status={status} />
                    </div>
                </div>

                <ActionsMenu
                    id={id}
                    status={status}
                    on:submit
                />
            </li>
        {/each}
    {/if}
</ul>
