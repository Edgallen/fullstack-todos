<script lang="ts">
    let className: string | undefined | null = undefined;

    export { className as class };
    export let width: number;
    export let height: number;
</script>

<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"
     class={className}
>
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    <rect width="20" height="14" x="2" y="6" rx="2"/>
</svg>
