<script>
    export let title = '';
    let isHovered = false;
    let x;
    let y;

    function mouseOver(event) {
        isHovered = true;
        x = event.pageX + 5;
        y = event.pageY + 5;
    }
    function mouseMove(event) {
        x = event.pageX + 5;
        y = event.pageY + 5;
    }
    function mouseLeave() {
        isHovered = false;
    }
</script>

<span
        on:mouseover={mouseOver}
        on:mouseleave={mouseLeave}
        on:mousemove={mouseMove}>
    <slot />
</span>

{#if isHovered}
    <div style="margin-top: 15px; margin-left: 5px; margin-right: 5px; top: {y}px; left: {x}px;" class="tip">{title}</div>
{/if}