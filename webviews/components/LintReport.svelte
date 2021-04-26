<script lang="ts">
    import {onMount} from 'svelte';

    onMount(() => {
        tsvscode.postMessage({
            type: 'init-view',
        });
    });
    let dataType = "";
    let flow;

    function windowMessage(event) {

        const message = event.data; // The json data that the extension sent
        switch (message.type) {
            case 'init':
                //the extension is sending us an init event with the document text
                //note: this is the document NOT the state, the state takes precendece, so if any state exists use that instead
                const state = tsvscode.getState();
                if (state) {
                    //we push this state from the vscode workspace to the JSON this component is looking at
                    flow = state.flow;
                } else {
                    //use the state data
                    flow = message.flow;
                }
                dataType = message.dataType;
                return;
            case 'update':
                //assign data
                flow = message.flow;
                // assign state
                tsvscode.setState({flow});
                return;
        }
    }
</script>

<svelte:window on:message={windowMessage}/>

{#if flow}
    <div>
        <h2 style="float: left">Flow Name: {flow.label}</h2>
        <h2 style="float: right">Results</h2>
    </div>

    <hr class="dashed">
    {#if !flow.nodesWithHardcodedIds}
        <table>
            <caption>0 hardcoded id(s)</caption>
        </table>
    {/if}
    {#if flow.nodesWithHardcodedIds && flow.nodesWithHardcodedIds.length > 0}
        <table>
            <caption>{flow.nodesWithHardcodedIds.length} hardcoded id(s):</caption>
            <thead>
            <tr>
                <th>Name</th>
                <th>Subtype</th>
            </tr>
            </thead>
            <tbody>
            {#each flow.nodesWithHardcodedIds as nodeWithHardcodedIds}
                <tr>
                    <td>{nodeWithHardcodedIds.name}</td>
                    <td>{nodeWithHardcodedIds.subtype}</td>
                </tr>
            {/each}
            </tbody>
        </table>
    {/if}
    <hr class="dashed">
    {#if !flow.unconnectedElements}
        <table>
            <caption>0 unconnected element(s)</caption>
        </table>
    {/if}
    {#if flow.unconnectedElements && flow.unconnectedElements.length > 0}
        <table>
            <caption>{flow.unconnectedElements.length} unconnected element(s):</caption>
            <thead>
            <tr>
                <th>Name</th>
                <th>Subtype</th>
            </tr>
            </thead>
            <tbody>
            {#each flow.unconnectedElements as unconnectedElement}
                <tr>
                    <td>{unconnectedElement.name}</td>
                    <td>{unconnectedElement.subtype}</td>
                </tr>
            {/each}
            </tbody>
        </table>
    {/if}
    <hr class="dashed">
    {#if !flow.unusedVariables}
        <table>
            <caption>0 unused variable(s)</caption>
        </table>
    {/if}
    {#if flow.unusedVariables && flow.unusedVariables.length > 0}
        <table>
            <caption>{flow.unusedVariables.length} unused variable(s):</caption>
            <thead>
            <tr>
                <th>Name</th>
                <th>Subtype</th>
            </tr>
            </thead>
            <tbody>
            {#each flow.unusedVariables as unusedVariable}
                <tr>
                    <td>{unusedVariable.name}</td>
                    <td>{unusedVariable.subtype}</td>
                </tr>
            {/each}
            </tbody>
        </table>
    {/if}
    <hr class="dashed">
{/if}
