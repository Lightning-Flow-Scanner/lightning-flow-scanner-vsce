<script lang="typescript">
    import Sidebar from "./Sidebar.svelte";
    import {onMount} from 'svelte';
    import * as core from 'lightningflowscan-core/out';

    onMount(() => tsvscode.postMessage({type: 'init-view'}));
    let sortBy = {col: "resultCount", ascending: false};
    let scanResults;
    let sidebar_show = false;
    let selectedRules = new Set(core.getRuleDefinitions().map(rule => rule.name));

    $: {
        if (selectedRules !== undefined && selectedRules.size > 0) {
            for (let selectedRule of selectedRules){
                console.log('rule rec = ' + selectedRule);
            }
        }
        // if(scanResults){
        //     // sort("resultCount", false);
        // }

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

        // todo fix and allow sorting
        // if (sortBy.col == column && ascending !== sortBy.ascending) {
        //     sortBy.ascending = !sortBy.ascending;
        // } else {
        //     sortBy.col = column;
        //     sortBy.ascending = true;
        // }
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
                        {scanResult.ruleResults.reduce((total, rule) => {
                            if(selectedRules.has(rule.ruleName)){
                              total = (total + rule.results.length)
                            }
                            return total;
                        }, 0)}
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

