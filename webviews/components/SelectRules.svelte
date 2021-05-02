<script lang="ts">
    import {onMount} from 'svelte';

    onMount(() => {
        tsvscode.postMessage({
            type: 'init-view',
        });
    });

    let dmlStatementInLoop = true;
    let hardcodedIds = true;
    let unconnectedElements = true;
    let unusedVariables = true;
    let missingFaultPaths = true;

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

    function runRules(dmlStatementInLoop, hardcodedIds, unconnectedElements, unusedVariables, missingFaultPaths) {
        tsvscode.postMessage({
            type: 'selectedRules',
            dmlStatementInLoop,
            hardcodedIds,
            unconnectedElements,
            unusedVariables,
            missingFaultPaths
        })
    }


</script>

<svelte:window on:message={windowMessage}/>

<h2>Lint Rules</h2>

<p>Select the rules to include:</p>

<label>
    <input type=checkbox bind:checked={dmlStatementInLoop}> DML statements inside of loops
</label><br/>

<label>
    <input type=checkbox bind:checked={hardcodedIds}> Hardcoded ids
</label><br/>

<label>
    <input type=checkbox bind:checked={missingFaultPaths}> Missing fault path
</label><br/>

<label>
    <input type=checkbox bind:checked={unconnectedElements}> Unconnected elements
</label><br/>

<label>
    <input type=checkbox bind:checked={unusedVariables}> Unused variables
</label><br/>

<button on:click={() => runRules(
dmlStatementInLoop, hardcodedIds, unconnectedElements, unusedVariables, missingFaultPaths
)}>Lint
</button>