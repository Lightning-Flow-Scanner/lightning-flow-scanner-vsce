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
</script>

<svelte:window on:message={windowMessage} />

<Banner />

<!-- <button>TODO TOP RIGHT GOTO BUTTONS: ALL RESULTS</button> -->
<!-- TOP LEFT DOWNLOAD -->

<Select {items} multiple={true} bind:value />
{#if !scanResults}
    <div class="centered">
        <div class="loader" />
    </div>
{/if}
{#if scanResults && scanResults.length > 0}
    <ScanResultTable bind:scanResults />
{/if}
