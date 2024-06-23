<script lang="ts">
    import InputForm from "./components/InputForm/InputForm.svelte";
    import StatusSelector from "./components/StatusSelector/StatusSelector.svelte";
    import TodosList from "./components/TodosList/TodosList.svelte";

    import { statusQuery } from './stores'

    $: todosData = $statusQuery ? getTodos($statusQuery) : null

    const getTodos = (status: string) => (
        fetch('/todos/?' + new URLSearchParams({ status }))
            .then((response) => response.json())
    )

    const fetchTodosOnSubmit = (status: string | null) => {
        if (status) {
            todosData = getTodos(status)
        }
    }
</script>

<div class="flex flex-col w-[600px]">
    <InputForm
        on:submit={() => fetchTodosOnSubmit($statusQuery)}
    />

    <StatusSelector />

    {#await todosData}
        <span class="flex items-center justify-center w-full h-12 text-gray-900">
            Loading...
        </span>
    {:then todos}
        <span>
            <TodosList
                todos={todos}
                on:submit={() => fetchTodosOnSubmit($statusQuery)}
            />
        </span>
    {/await}
</div>
