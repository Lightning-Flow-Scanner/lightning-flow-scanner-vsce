<script lang="typescript">
    import Sidebar from "./Sidebar.svelte";
    import {onMount} from 'svelte';
    import * as core from 'lightning-flow-scanner-core/out';

    onMount(() => tsvscode.postMessage({type: 'init-view'}));
    let sortBy = {col: "resultCount", ascending: false};
    let scanResults;
    let sidebar_show = false;
    let selectedRules = new Set(core.getRules().map(rule => rule.name));

    $: {
        if(scanResults){
            scanResults.forEach(scanResult => {
                scanResult.resultCount = scanResult.ruleResults.reduce((total, rule) => {
                    if(selectedRules.has(rule.ruleName)){
                        if(rule.details){
                            total = (total + rule.details.length)
                        } else if(rule.occurs){
                            total = (total + 1)
                        }
                    }
                    return total;
                }, 0)
            });
            sort("resultCount", false);
        }
    }

    function windowMessage(event) {
        const message = event.data;
        switch (message.type) {
            case 'init':
                scanResults = message.value;
                return;
            case 'update':
                scanResults = message.value;
                return;
        }
    }

    function goToFile(flow) {
        tsvscode.postMessage({
            type: 'goToFile',
            value: flow
        })
    }

    function goToDetails(scanResult) {
        tsvscode.postMessage({
            type: 'goToDetails',
            value: scanResult
        })
    }

    function sort(column, ascending) {

        // // Modifier to sorting function for ascending or descending
        let sortModifier = (sortBy.ascending) ? 1 : -1;
        let sort = (a, b) =>
        (a[column] < b[column])
                ? -1 * sortModifier
                : (a[column] > b[column])
                ? 1 * sortModifier
                : 0;
        scanResults = scanResults.sort(sort);
    }

</script>

<svelte:window on:message={windowMessage}/>

<Sidebar bind:selectedRules={selectedRules} bind:show={sidebar_show}/>

{#if !scanResults}
<div class="centered">
    <div class="loader"></div>
</div>
{/if}

{#if scanResults && scanResults.length > 0}
    <table>
        <caption><button on:click={() => sidebar_show = !sidebar_show}>Filter Rules</button></caption>
        <thead>
        <tr>
            <th id="results" on:click={() => sort("resultCount", sortBy.ascending)}>#Results</th>
            <th id="label" on:click={() => sort("label", sortBy.ascending)}>Label</th>
            <th id="type" on:click={() => sort("type", sortBy.ascending)}>Flow Type</th>
            <th id="details">Report</th>
        </tr>
        </thead>
        <tbody>
        {#each scanResults as scanResult}
            {#if scanResult.flow.label && scanResult.flow.start &&  scanResult.flow.processType && scanResult.flow.nodes}
                <tr>
                    <td>
                        {scanResult.resultCount}
                    </td>
                    <td><a href="/" on:click|preventDefault={() => goToFile(scanResult.flow)}>
                        <div>
                            {scanResult.flow.label}
                        </div>
                    </a></td>
                    <td>{scanResult.flow.type}</td>
                    <td>
                        <button on:click={() => goToDetails(scanResult)}>
                            Details
                        </button>
                    </td>
                </tr>
            {/if}
        {/each}
        </tbody>
    </table>
{/if}

