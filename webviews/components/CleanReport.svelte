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
        console.log({message});
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
<h2>Clean Flow Results:</h2>

{#if !unconnectedElements}
    <h3>0 unused elements found</h3>
    <br />
{/if}
{#if unconnectedElements && unconnectedElements.length > 0}
    <h3>{unconnectedElements.length} unused elements have been removed:</h3>
    <ul>
        {#each unconnectedElements as unconnectedElement}
            <li>{unconnectedElement.name}</li>
<!--            todo line number -->
        {/each}
    </ul>
{/if}
{#if !unusedVariables}
    <h2>No unused variables found</h2>
    <br />
{/if}
{#if unusedVariables && unusedVariables.length > 0}
    <h3>{unusedVariables.length} unused variables have been removed:</h3>
    <ul>
        {#each unusedVariables as unusedVariable}
        <!--            todo line number -->
            <!--            todo var type -->
            <li>{unusedVariable.name}</li>
        {/each}
    </ul>
{/if}
