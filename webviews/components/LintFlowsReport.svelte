<script lang="typescript">
    import Sidebar from "./Sidebar.svelte";
    import {onMount} from 'svelte';

    onMount(() => tsvscode.postMessage({type: 'init-view'}));
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
        if(selectedRules !== undefined && selectedRules.size > 0){
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

</script>


<svelte:window on:message={windowMessage}/>

<button on:click={() => sidebar_show = !sidebar_show}>Filter Rules</button>

<Sidebar bind:selectedRules={selectedRules} bind:show={sidebar_show}/>

{#if flows && flows.length > 0}
    <table>
        <thead>
        <tr>
            <th id="label">Label</th>
            <th id="type">Flow Type</th>
            <th id="results">#Results</th>
            <th id="details">Report</th>
        </tr>
        </thead>
        <tbody>
        {#each flows as flow}
            {#if flow.label && flow.start &&  flow.processType && flow.nodes}
                <tr>
                    <td><a href="/" on:click|preventDefault={() => goToFile(flow)}>
                        <div>
                            {flow.label}
                        </div>
                    </a></td>
                    {#if flow.start[0].triggerType}
                        <td>'Trigger:' + {flow.start[0].triggerType}</td>
                    {/if}
                    {#if !flow.start[0].triggerType}
                        <td>{flow.processType[0] === 'Flow' ? 'Visual Flow' : flow.processType}</td>
                    {/if}
                    <td>
                        {(dmlStatementInLoop ? (flow.dmlStatementInLoop? flow.dmlStatementInLoop.length : 0) : 0 ) +
                        (duplicateDMLOperations ? (flow.duplicateDMLOperationsByNavigation? flow.duplicateDMLOperationsByNavigation.length: 0) : 0 ) +
                        (missingDescription ? (flow.missingDescription? 1: 0) : 0 ) +
                        (missingFaultPaths ? (flow.missingFaultPaths? flow.missingFaultPaths.length: 0) : 0 ) +
                        (missingNullHandlers ? (flow.missingNullHandlers? flow.missingNullHandlers.length: 0) : 0 ) +
                        (hardcodedIds ? (flow.nodesWithHardcodedIds? flow.nodesWithHardcodedIds.length : 0) : 0 ) +
                        (unconnectedElements ? (flow.unconnectedElements? flow.unconnectedElements.length: 0) : 0 ) +
                        (unusedVariables ? (flow.unusedVariables? flow.unusedVariables.length: 0): 0 )}
                    </td>
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

