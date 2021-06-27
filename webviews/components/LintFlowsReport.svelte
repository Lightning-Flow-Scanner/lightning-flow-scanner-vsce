<script lang="typescript">
    import Sidebar from "./Sidebar.svelte";
    import {onMount} from 'svelte';

    onMount(() => tsvscode.postMessage({type: 'init-view'}));
    let sortBy = {col: "resultCount", ascending: false};
    let flows;
    let sidebar_show = false;
    let dmlStatementInLoop = false;
    let duplicateDMLOperations = false;
    let hardcodedIds = false;
    let missingDescription = false;
    let missingFaultPaths = false;
    let missingNullHandlers = false;
    let unconnectedElements = false;
    let unusedVariables = false;
    let selectedRules;

    $: {
        if (selectedRules !== undefined && selectedRules.size > 0) {
            dmlStatementInLoop = !!selectedRules.has("dmlStatementInLoop");
            duplicateDMLOperations = !!selectedRules.has("duplicateDMLOperations");
            hardcodedIds = !!selectedRules.has("hardcodedIds");
            missingDescription = !!selectedRules.has("missingDescription");
            missingFaultPaths = !!selectedRules.has("missingFaultPaths");
            missingNullHandlers = !!selectedRules.has("missingNullHandlers");
            unconnectedElements = !!selectedRules.has("unconnectedElements");
            unusedVariables = !!selectedRules.has("unusedVariables");
        } else {
            dmlStatementInLoop = false;
            duplicateDMLOperations = false;
            hardcodedIds = false;
            missingDescription = false;
            missingFaultPaths = false;
            missingNullHandlers = false;
            unconnectedElements = false;
            unusedVariables = false;
        }
        if(flows){
            flows.forEach(flow => {
                let count = 0;
                for (const result of flow.scanResults){
                    if(result.results === true){
                        count = count + 1;
                    } else if(result.results === false){

                    } else {
                        count = count + result.results.length;
                    }
                }
                flow.resultCount = count;
            });
            sort("resultCount", false);
        }

    }

    function windowMessage(event) {
        const message = event.data;
        switch (message.type) {
            case 'init':
                flows = message.flows;
                return;
            case 'update':
                flows = message.flows;
                return;
        }
    }

    function goToFile(flow) {
        tsvscode.postMessage({
            type: 'goToFile',
            flow: flow
        })
    }

    function goToDetails(flow) {
        tsvscode.postMessage({
            type: 'goToDetails',
            flow: flow
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

        flows = flows.sort(sort);
    }

</script>

<svelte:window on:message={windowMessage}/>


<Sidebar bind:selectedRules={selectedRules} bind:show={sidebar_show}/>

{#if flows && flows.length > 0}
    <p>{flows[0].scanResults[0].results}</p>
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
        {#each flows as flow}
            {#if flow.label && flow.start &&  flow.processType && flow.nodes}
                <tr>
                    <td>
                        {flow.resultCount}
                    </td>
                    <td><a href="/" on:click|preventDefault={() => goToFile(flow)}>
                        <div>
                            {flow.label}
                        </div>
                    </a></td>
                    <td>{flow.type}</td>
                    <td>
                        <button on:click={() => goToDetails(flow)}>
                            Details
                        </button>
                    </td>
                </tr>
            {/if}
        {/each}
        </tbody>
    </table>
{/if}

