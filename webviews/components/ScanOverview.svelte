<script lang="typescript">
    import { onMount } from "svelte";
    import * as core from "lightning-flow-scanner-core/out";
    import ScanResultTable from "./ScanResultTable.svelte";
    import Banner from "./Banner.svelte";
    import Select from "svelte-select";

    onMount(() => {
        tsvscode.postMessage({ type: "init-view" });
    });
    let sortByColumn = "label";
    let sortByAscending = false;
    let scanResults;
    let items = core.getRules().map((rule) => {
        return { label: rule.label, value: rule.name };
    });
    let value = [...items];

    $: {
        if (scanResults) {
            scanResults.forEach((scanResult) => {
                scanResult.resultCount = scanResult.ruleResults.reduce(
                    (total, rule) => {
                        let selectedValues = value.map((val) => val.value);
                        if (selectedValues.includes(rule.ruleName)) {
                            total = total + rule.details.length;
                        }
                        return total;
                    },
                    0
                );
                scanResult.label = scanResult.flow.label[0];
                scanResult.type = scanResult.flow.type[0];
            });
            scanResults = scanResults;
            // sort(scanResults, );
        }
    }

    function windowMessage(event) {
        const message = event.data;
        switch (message.type) {
            case "init":
                scanResults = message.value;
                return;
            case "update":
                scanResults = message.value;
                return;
        }
    }

    function sort(results, column) {
        if (sortByColumn === column) {
            sortByAscending = !sortByAscending;
        } else {
            sortByColumn = column;
            sortByAscending = true;
        }

        let sortModifier = sortByAscending ? 1 : -1;
        let sort = (a, b) =>
            a[column] < b[column]
                ? -1 * sortModifier
                : a[column] > b[column]
                ? 1 * sortModifier
                : 0;
        return (results = results.sort(sort));
    }

    function viewAll() {
        tsvscode.postMessage({
            type: "goToAllDetails",
            value: scanResults,
        });
    }
</script>

<svelte:window on:message={windowMessage} />

{#if !scanResults}
    <div class="centered">
        <div class="loader" />
    </div>
{/if}
{#if scanResults && scanResults.length > 0}
    <div class="nav-menu">
        <div class="nav-button-left">
        <button class="button" on:click={viewAll}>View all results</button></div>
        <button class="button">Print</button>
        <Banner />
        <div class="nav-button-right">
            <!-- <button class="button">Download</button> -->
        </div>
    </div>
    <Select {items} multiple={true} bind:value />
    <ScanResultTable bind:scanResults />
{/if}

<style>

    .button {
        flex-grow: 1;
        margin: 5px;
        padding: 10px;
        text-align: center;
        background-color: #2765ae; /* You can change the background color */
        color: white; /* You can change the text color */
        border: none;
        cursor: pointer;
    }

    .nav-menu {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            background-color: #333;
            color: white;
            background-color: white;
        }

        .nav-button-left {
            flex: 1;
            text-align: left;
        }

        .nav-button-right {
            flex: 1;
            text-align: right;
        }

        .nav-button-left button,
        .nav-button-right button {
            width: 200px;
            margin: 5px auto;
        }

        @media (max-width: 600px) {
            .nav-menu {
                flex-direction: column;
            }

            .nav-button-left,
            .nav-button-right {
                flex: 100%;
            }
        }
</style>
