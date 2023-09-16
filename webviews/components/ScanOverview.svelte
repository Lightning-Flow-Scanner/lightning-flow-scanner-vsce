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

<Select {items} multiple={true} bind:value />
{#if !scanResults}
    <div class="centered">
        <div class="loader" />
    </div>
{/if}
{#if scanResults && scanResults.length > 0}

    <div class="nav-menu">
        <div class="nav-button-left">
        <button class="button" on:click={viewAll}>View all results</button>
        </div>
            <Banner />
        <div class="nav-button-right">
            <button class="button">Print</button>
        </div>
    </div>

    <ScanResultTable bind:scanResults />
{/if}

<style>

    .button {
        flex-grow: 1;
        margin: 5px;
        padding: 10px;
        text-align: center;
        background-color: #0074d9; /* You can change the background color */
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

        /* Left button */
        .nav-button-left {
            flex: 1;
            text-align: left;
            padding-left: 10px;
        }

        /* Right button */
        .nav-button-right {
            flex: 1;
            text-align: right;
            padding-right: 10px;
        }

        /* Media query for responsive layout */
        @media (max-width: 600px) {
            .nav-menu {
                flex-direction: column;
            }

            .nav-button-left,
            .nav-button-right {
                flex: 100%;
                text-align: center;
                padding: 10px;
            }
        }
</style>
