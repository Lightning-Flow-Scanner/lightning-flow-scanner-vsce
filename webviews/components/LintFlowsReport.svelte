<script lang="ts">
    import {onMount} from 'svelte';

    onMount(() => {
        tsvscode.postMessage({
            type: 'init-view',
        });
    });
    let flows;

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

<h2>Lint Results</h2>
{#if flows && flows.length > 0}
    <table>
        <thead>
        <tr>
            <th>Label</th>
            <th>Flow Type</th>
            <th>#Results</th>
            <th>Report</th>
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
                        <td>{flow.start[0].triggerType + '-Trigger'}</td>
                    {/if}
                    {#if !flow.start[0].triggerType}
                        <td>{flow.processType[0] === 'Flow' ? 'Visual Flow' : flow.processType}</td>
                    {/if}
                    <td>
                        {
                        (flow.dmlStatementInLoop? flow.dmlStatementInLoop.length : 0) +
                        (flow.duplicateDMLOperationsByNavigation? flow.duplicateDMLOperationsByNavigation.length: 0) +
                        (flow.nodesWithHardcodedIds? flow.nodesWithHardcodedIds.length : 0) +
                        (flow.unconnectedElements? flow.unconnectedElements.length: 0) +
                        (flow.unusedVariables? flow.unusedVariables.length: 0) +
                        (flow.missingFaultPaths? flow.missingFaultPaths.length: 0)
                        }
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

