<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let currentPage;

    function viewAll() {
        dispatch("navigate", "viewAll");
    }

    function viewOverview() {
        dispatch("navigate", "overview");
    }
</script>

<div class="nav-menu">
    {#if currentPage === "overview"}
            <div class="nav-button-left">
                <button on:click={viewAll}>All Results</button>
            </div>
    {:else if currentPage === "viewAll"}
            <div class="nav-button-left">
                <button on:click={viewOverview}>Overview</button>
            </div>
    {/if}
    <div class="banner-container">
        <div class="banner">
            <a href="https://github.com/Force-Config-Control">
                <img
                    src="https://github.com/Force-Config-Control/.github/raw/main/docs/images/bannerslim.png"
                    alt="Lightning Flow Scanner banner"
                />
            </a>
        </div>
    </div>
    <div class="nav-button-right">
        <button>Print</button>
    </div>
</div>

<style>
    .nav-menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        text-align: center;
    }

    .banner-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 75px;
    }

    .banner {
        text-align: center;
        width: 100%;
        height: 75px;
    }

    .banner img {
        width: 100%;
        height: auto;
    }

    button {
        background-color: #2765ae;
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 5px 5px 5px #000;
        border-radius: 15px;
    }

    .nav-button-left button,
    .nav-button-right button {
        width: 150px;
    }
</style>
