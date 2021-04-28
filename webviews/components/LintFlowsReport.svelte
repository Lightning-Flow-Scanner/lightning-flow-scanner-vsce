<script lang="ts">
    import {onMount} from 'svelte';

    onMount(() => {
        tsvscode.postMessage({
            type: 'init-view',
        });
    });
    let dataType = "";
    let flows;

    function windowMessage(event) {

        const message = event.data;
        switch (message.type) {
            case 'init':
                const state = tsvscode.getState();
                if (state) {
                    flows = state.flows;
                } else {
                    flows = message.flows;
                }
                dataType = message.dataType;
                return;
            case 'update':
                flows = message.flows;
                tsvscode.setState({flows});
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
            <th>Nr of Violations</th>
            <th>Results</th>
        </tr>
        </thead>
        <tbody>
        {#each flows as flow}
            <tr>
                <td><a href="/" on:click|preventDefault={() => goToFile(flow)}>
                    <div style="height:100%;width:100%">
                        {flow.label}
                    </div>
                </a></td>
                {#if flow.start[0].triggerType}
                    <td>{flow.start[0].triggerType + '-Trigger'}</td>
                {/if}
                {#if !flow.start[0].triggerType}
                    <td>{flow.processType[0] === 'Flow' ? 'Visual Flow' : flow.processType}</td>
                {/if}
                <td>{flow.unconnectedElements.length + flow.unusedVariables.length + flow.nodesWithHardcodedIds.length}</td>
                <td>
                    <button on:click={() => goToDetails(flow)}>
                        Details
                    </button>
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
{/if}

