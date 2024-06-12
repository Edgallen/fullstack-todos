<script lang="ts">
    import type {HTMLInputAttributes} from "svelte/elements";

    export let label: string
    export let title: string
    export let value: string = ''
    export let inputType: HTMLInputAttributes['type'] = 'text'
    export let autocomplete: HTMLInputAttributes['autocomplete'] = 'off'
    export let required: HTMLInputAttributes['required']
    export let error: null | string = null
</script>

<div>
    <label
        for={label}
        class="block text-sm font-medium leading-6 text-gray-900"
    >
        {label}
    </label>

    <div class="relative mt-2 mb-2">
        <input
            id={title}
            name={title}
            type={inputType}
            {value}
            {autocomplete}
            {required}
            class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        {#if error}
            <span class="absolute -bottom-6 text-sm text-red-500">
                {error}
            </span>
        {/if}
    </div>
</div>
