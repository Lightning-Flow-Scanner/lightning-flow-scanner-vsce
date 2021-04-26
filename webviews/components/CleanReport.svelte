<script lang="ts">
    import {onMount} from 'svelte';

    onMount(() => {
        console.log('mount');
        tsvscode.postMessage({
            type: 'init-view',
        });
    });
    let dataType = "";
    let unusedVariables;
    let unconnectedElements;
    let text = {};
    let label = "";

    function windowMessage(event) {

        const message = event.data; // The json data that the extension sent
        switch (message.type) {
            case 'init':
                //the extension is sending us an init event with the document text
                //note: this is the document NOT the state, the state takes precendece, so if any state exists use that instead
                const state = tsvscode.getState();
                if (state) {
                    //we push this state from the vscode workspace to the JSON this component is looking at
                    text = JSON.parse(state.text);
                } else {
                    //use the state data
                    text = JSON.parse(message.text);
                    label = message.label;
                    unconnectedElements = message.unconnectedElements;
                    unusedVariables = message.unusedVariables;
                }
                dataType = message.dataType;
                return;
            case 'update':
                //assign data
                label = message.label;
                unconnectedElements = message.unconnectedElements;
                unusedVariables = message.unusedVariables;
                text = JSON.parse(message.text);
                // assign state
                tsvscode.setState({text, label, unconnectedElements, unusedVariables});
                return;
        }
    }
</script>

<svelte:window on:message={windowMessage}/>

<div>
    <h2 style="float: left">Flow Name: {label}</h2>
    <h2 style="float: right">Results</h2>
</div>

{#if !unusedVariables}
    <table>
        <caption>0 unused variable(s) removed</caption>
    </table>
{/if}
{#if unusedVariables && unusedVariables.length > 0}
    <table>
        <caption>{unusedVariables.length} unused variable(s) removed:</caption>
        <thead>
        <tr>
            <th>Name</th>
            <th>Subtype</th>
        </tr>
        </thead>
        <tbody>
        {#each unusedVariables as unusedVariable}
            <tr>
                <td>{unusedVariable.name}</td>
                <td>{unusedVariable.subtype}</td>
            </tr>
        {/each}
        </tbody>
    </table>
{/if}

{#if !unconnectedElements}
    <table>
        <caption>0 unconnected element(s) removed</caption>
    </table>
{/if}
{#if unconnectedElements && unconnectedElements.length > 0}
    <table>
        <caption>{unconnectedElements.length} unconnected element(s) removed:</caption>
        <thead>
        <tr>
            <th>Name</th>
            <th>Subtype</th>
        </tr>
        </thead>
        <tbody>
        {#each unconnectedElements as unconnectedElement}
            <tr>
                <td>{unconnectedElement.name}</td>
                <td>{unconnectedElement.subtype}</td>
            </tr>
        {/each}
        </tbody>
    </table>
{/if}

