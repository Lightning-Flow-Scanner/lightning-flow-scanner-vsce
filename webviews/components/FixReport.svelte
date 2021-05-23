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
    <div class="main">
    <table>
        <thead>
        <tr>
            <th colspan=2>Applied Fix</th>
            <th colspan=1># Results</th>
        </tr>
        </thead>
        <tbody>
        {#if flow.unconnectedElements && flow.unconnectedElements.length === 0}
            <tr>
                <td colspan=2>Unconnected elements removed</td>
                <td>0</td>
            </tr>
        {/if}
        {#if flow.unconnectedElements &&  flow.unconnectedElements.length > 0}
            <tr>
                <td colspan=2>Unconnected elements removed</td>
                <td colspan=1>{flow.unconnectedElements.length}</td>
            </tr>
            <tr>
                <td colspan=3>
                    <div class="subtable">
                        <table style="width: 100%;">
                            {#each flow.unconnectedElements as unconnectedElement, i}
                                <tr>
                                    <td style="width: 10%">{i+1}</td>
                                    <td style="width: 45%">{unconnectedElement.name}</td>
                                    <td style="width: 45%; text-transform: capitalize;">{unconnectedElement.subtype}</td>
                                </tr>
                            {/each}
                        </table>
                    </div>
                </td>
            </tr>
        {/if}
        {#if flow.unusedVariables && flow.unusedVariables.length === 0}
            <tr>
                <td colspan=2>Unused variables removed</td>
                <td>0</td>
            </tr>
        {/if}
        {#if flow.unusedVariables &&  flow.unusedVariables.length > 0}
            <tr>
                <td colspan=2>Unused variables removed</td>
                <td colspan=1>{flow.unusedVariables.length}</td>
            </tr>
            <tr>
                <td colspan=3>
                    <div class="subtable">
                        <table style="width: 100%;">
                            {#each flow.unusedVariables as unusedVariable, i}
                                <tr>
                                    <td style="width: 10%">{i+1}</td>
                                    <td style="width: 45%">{unusedVariable.name}</td>
                                    <td style="width: 45%; text-transform: capitalize;">{unusedVariable.subtype}</td>
                                </tr>
                            {/each}
                        </table>
                    </div>
                </td>
            </tr>
        {/if}
        <tr>
            <td colspan=2><br/><strong># Fixes Applied</strong></td>
            <td colspan=1><br/><strong>{(flow.unconnectedElements? flow.unconnectedElements.length: 0) +
            (flow.unusedVariables? flow.unusedVariables.length: 0)}</strong></td>
        </tr>
        </tbody>
    </table>
    </div>
{/if}