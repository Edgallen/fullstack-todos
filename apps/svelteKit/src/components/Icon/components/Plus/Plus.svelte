<script lang="ts">
    let className: string | undefined | null = undefined;

    export { className as class };
    export let width: number;
    export let height: number;
</script>

<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
     class={className}>
    <path d="M5 12h14"/>
    <path d="M12 5v14"/>
</svg>
