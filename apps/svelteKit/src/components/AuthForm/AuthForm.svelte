<script lang="ts">
    export let title: string
    export let buttonTitle: string
    export let action: string
</script>

<div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {title}
    </h2>
</div>

<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form
        class="flex flex-col gap-6"
        method="POST"
        {action}
    >
        <slot />

        <div>
            <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                {buttonTitle}
            </button>
        </div>
    </form>
</div>
