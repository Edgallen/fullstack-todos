<script>
    import Header from "$components/Header/Header.svelte";
</script>

<main class="bg-white flex flex-col pb-8 gap-8 items-center size-full min-h-dvh">
    <Header />

    <slot />
</main>
