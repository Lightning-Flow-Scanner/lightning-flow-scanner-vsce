
<style>
    .tip {
    color:#fff;
    background-color:#feb22a;
    width:15px;
    height:15px;
    display:inline-block;
    border-radius:100%;
    font-size: medium;
    text-align:center;
    text-decoration:none;
    -webkit-box-shadow: inset -1px -1px 1px 0px rgba(0,0,0,0.25);
    -moz-box-shadow: inset -1px -1px 1px 0px rgba(0,0,0,0.25);
    box-shadow: inset -1px -1px 1px 0px rgba(0,0,0,0.25);
}
</style>

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
    <br />
{/if}