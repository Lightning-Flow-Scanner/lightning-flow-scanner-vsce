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

    function autoFix(flow) {
        tsvscode.postMessage({
            type: 'autofix',
            flow: flow
        });
    }
</script>

<svelte:window on:message={windowMessage}/>

{#if flow}
    <h2>Results: {flow.label}</h2>

    <div id="mb">
        {#if flow.dmlStatementInLoop && flow.dmlStatementInLoop.length === 0}
            <table>
                <caption>0 DML statement(s) in a loop.</caption>
            </table>
        {/if}
        {#if flow.dmlStatementInLoop &&  flow.dmlStatementInLoop.length > 0}
            <table>
                <caption>{flow.dmlStatementInLoop.length} DML statement(s) in a loop:</caption>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Subtype</th>
                </tr>
                </thead>
                <tbody>
                {#each flow.dmlStatementInLoop as dmlInLoop}
                    <tr>
                        <td>{dmlInLoop.name}</td>
                        <td>{dmlInLoop.subtype}</td>
                    </tr>
                {/each}
                </tbody>
            </table>
        {/if}
        {#if flow.duplicateDMLOperationsByNavigation && flow.duplicateDMLOperationsByNavigation.length === 0}
            <table>
                <caption>0 duplicate changes by navigation.</caption>
            </table>
        {/if}
        {#if flow.duplicateDMLOperationsByNavigation &&  flow.duplicateDMLOperationsByNavigation.length > 0}
            <table>
                <caption>{flow.duplicateDMLOperationsByNavigation.length} duplicate changes by navigation:</caption>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Subtype</th>
                </tr>
                </thead>
                <tbody>
                {#each flow.duplicateDMLOperationsByNavigation as duplicateChangeByNavigation}
                    <tr>
                        <td>{duplicateChangeByNavigation.name}</td>
                        <td>{duplicateChangeByNavigation.subtype}</td>
                    </tr>
                {/each}
                </tbody>
            </table>
        {/if}
        {#if flow.nodesWithHardcodedIds && flow.nodesWithHardcodedIds.length === 0}
            <table>
                <caption>0 hardcoded ids.</caption>
            </table>
        {/if}
        {#if flow.nodesWithHardcodedIds && flow.nodesWithHardcodedIds.length > 0}
            <table>
                <caption>{flow.nodesWithHardcodedIds.length} hardcoded ids:</caption>
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
        {#if flow.missingDescription}
            <table>
                <caption>1 flow description missing.</caption>
            </table>
        {/if}
        {#if !flow.missingDescription}
            <table>
                <caption>0 flow description missing.</caption>
            </table>
        {/if}
        {#if flow.missingFaultPaths && flow.missingFaultPaths.length === 0}
            <table>
                <caption>0 missing error handlers.</caption>
            </table>
        {/if}
        {#if flow.missingFaultPaths && flow.missingFaultPaths.length > 0}
            <table>
                <caption>{flow.missingFaultPaths.length} missing error handlers:</caption>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Subtype</th>
                </tr>
                </thead>
                <tbody>
                {#each flow.missingFaultPaths as missingFaultPath}
                    <tr>
                        <td>{missingFaultPath.name}</td>
                        <td>{missingFaultPath.subtype}</td>
                    </tr>
                {/each}
                </tbody>
            </table>
        {/if}
        {#if flow.missingNullHandler && flow.missingNullHandler.length === 0}
            <table>
                <caption>0 missing null handlers.</caption>
            </table>
        {/if}
        {#if flow.missingNullHandler && flow.missingNullHandler.length > 0}
            <table>
                <caption>{flow.missingNullHandler.length} missing null handlers:</caption>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Subtype</th>
                </tr>
                </thead>
                <tbody>
                {#each flow.missingNullHandler as missingNullHandler}
                    <tr>
                        <td>{missingNullHandler.name}</td>
                        <td>{missingNullHandler.subtype}</td>
                    </tr>
                {/each}
                </tbody>
            </table>
        {/if}
        {#if flow.unconnectedElements && flow.unconnectedElements.length === 0}
            <table>
                <caption>0 unconnected element(s).</caption>
            </table>
        {/if}
        {#if flow.unconnectedElements && flow.unconnectedElements.length > 0}
            <table>
                <caption>{flow.unconnectedElements.length} unconnected elements:</caption>
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
        {#if flow.unusedVariables && flow.unusedVariables.length === 0}
            <table>
                <caption>0 unused variable(s).</caption>
            </table>
        {/if}
        {#if flow.unusedVariables && flow.unusedVariables.length > 0}
            <table>
                <caption>{flow.unusedVariables.length} unused variables:</caption>
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
    {#if flow.unusedVariables || flow.unconnectedElements }
        <button on:click={() => autoFix(flow)}>
            Auto Fix
        </button>
    {/if}
{/if}
