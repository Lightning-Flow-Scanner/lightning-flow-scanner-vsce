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

        const message = event.data;
        switch (message.type) {
            case 'init':
                const state = tsvscode.getState();
                if (state) {
                    flow = state.flow;
                } else {
                    flow = message.flow;
                }
                dataType = message.dataType;
                return;
            case 'update':
                flow = message.flow;
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

    <div id="mb">
        {#if flow.unconnectedElements.length > 0}
            <hr class="dashed">
            <table>
                <caption>{flow.unconnectedElements.length} unconnected element(s) removed:</caption>
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
        {#if flow.unusedVariables.length > 0}
            <hr class="dashed">
            <table>
                <caption>{flow.unusedVariables.length} unused variable(s) removed:</caption>
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
    </div>
{/if}