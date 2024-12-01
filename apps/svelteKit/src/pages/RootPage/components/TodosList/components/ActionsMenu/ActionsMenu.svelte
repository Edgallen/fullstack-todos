<script lang="ts">
    import { enhance } from '$app/forms';
    import db from "@database/prisma";

    import {Menubar, MenubarContent, MenubarItem, MenubarTrigger} from '$components/MenuBar'
    import Icon from "$components/Icon/Icon.svelte";

    import {menuActions} from "./constants";

    import {createEventDispatcher} from "svelte";

    export let id: number;
    export let status: db.Status;

    const dispatch = createEventDispatcher()
    const submit = () => dispatch('submit')
</script>

<Menubar>
    <MenubarTrigger>
        <Icon
            type="ellipsisVertical"
            height={18}
            width={18}
        />
    </MenubarTrigger>

    <MenubarContent>
        {#each menuActions as {
            title,
            icon,
            className,
            statusShowCondition,
            statusToTransition,
            action
        } (title)}
            {#if !(statusShowCondition && statusShowCondition !== status)}
                <form
                    method="POST"
                    action={action}
                    use:enhance={({ formData }) => {
                        formData.append('id', String(id))
                        statusToTransition && formData.append('status', statusToTransition)

                        return async ({ update }) => {
                            await update();
                            submit()
                        }
                    }}
                >
                    <MenubarItem class={className}>
                        {#if icon}
                            <Icon
                                type={icon}
                                height={16}
                                width={16}
                            />
                        {/if}

                        <span>{title}</span>
                    </MenubarItem>
                </form>
            {/if}
        {/each}
    </MenubarContent>
</Menubar>
