<script lang="ts">
    import {createEventDispatcher} from "svelte";
    import {cn} from "$lib/utils";
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';

    import Icon from "$components/Icon/Icon.svelte";

    import type {ITodoFormState} from "$interfaces/todos";

    const dispatch = createEventDispatcher()

    let isButtonDisabled = false

    const submit = () => dispatch('submit')

    $: form = $page.form as ITodoFormState;
    $: isEmptyInput = Boolean(form?.errors?.text);
</script>

<form
    class="flex h-12"
    method="POST"
    action="?/addTodo"
    use:enhance={() => {
        isButtonDisabled = true

        return async ({ update }) => {
            await update();

            isButtonDisabled = false
            submit()
        }
    }}
>
    <input
        id="text"
        name="text"
        value={form?.text || ''}
        placeholder="Add a new task"
        class={cn("block w-full rounded-l-md border-1 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 sm:text-sm sm:leading-6", {
            'ring-red-500': isEmptyInput
        })}
        autoComplete="off"
    />

    <button
        class="flex items-center justify-center gap-1 size-full w-28 h-full text-2xl text-white bg-indigo-600 shadow-sm rounded-r-md hover:bg-indigo-500 disabled:bg-gray-500 disabled:cursor-progress"
        disabled={isButtonDisabled}
        type="submit"
    >
        <Icon
            type='plus'
            class="text-white"
            height={20}
            width={20}
        />

        <span class="text-xl">Add</span>
    </button>
</form>

{#if isEmptyInput}
    <span class="text-sm text-red-500 mt-2">
        {form?.errors?.text?.[0]}
    </span>
{/if}
