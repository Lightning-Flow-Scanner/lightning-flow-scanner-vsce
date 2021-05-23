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
<div class="main">
    <table>
        {#if flow.unusedVariables || flow.unconnectedElements }
            <caption>
                <button on:click={() => autoFix(flow)}>
                    Auto Fix
                </button>
            </caption>
        {/if}
        <thead>
        <tr>
            <th colspan=2>Rule</th>
            <th colspan=1># Results</th>
        </tr>
        </thead>
        <tbody>
        {#if flow.dmlStatementInLoop && flow.dmlStatementInLoop.length === 0}
            <tr>
                <td colspan=2>DML statement(s) in a loop</td>
                <td>0</td>
            </tr>
        {/if}
        {#if flow.dmlStatementInLoop &&  flow.dmlStatementInLoop.length > 0}
            <tr>
                <td colspan=2>DML statement(s) in a loop</td>
                <td colspan=1>{flow.dmlStatementInLoop.length}</td>
            </tr>
            <tr>
                <td colspan=3>
                    <div class="subtable">
                        <table style="width: 100%;">
                            {#each flow.dmlStatementInLoop as dmlInLoop, i}
                                <tr>
                                    <td style="width: 10%">{i+1}</td>
                                    <td style="width: 45%">{dmlInLoop.name}</td>
                                    <td style="width: 45%; text-transform: capitalize;">{dmlInLoop.subtype}</td>
                                </tr>
                            {/each}
                        </table>
                    </div>
                </td>
            </tr>
        {/if}
        {#if flow.duplicateDMLOperationsByNavigation && flow.duplicateDMLOperationsByNavigation.length === 0}
            <tr>
                <td colspan=2>Duplicate changes by navigation</td>
                <td>0</td>
            </tr>
        {/if}
        {#if flow.duplicateDMLOperationsByNavigation &&  flow.duplicateDMLOperationsByNavigation.length > 0}
            <tr>
                <td colspan=2>Duplicate changes by navigation</td>
                <td colspan=1>{flow.duplicateDMLOperationsByNavigation.length}</td>
            </tr>
            <tr>
                <td colspan=3>
                    <div class="subtable">
                        <table style="width: 100%;">
                            {#each flow.duplicateDMLOperationsByNavigation as duplicateChangeByNavigation, i}
                                <tr>
                                    <td style="width: 10%">{i+1}</td>
                                    <td style="width: 45%">{duplicateChangeByNavigation.name}</td>
                                    <td style="width: 45%; text-transform: capitalize;">{duplicateChangeByNavigation.subtype}</td>
                                </tr>
                            {/each}
                        </table>
                    </div>
                </td>
            </tr>
        {/if}
        {#if flow.nodesWithHardcodedIds && flow.nodesWithHardcodedIds.length === 0}
            <tr>
                <td colspan=2>Hardcoded ids</td>
                <td colspan=1>0</td>
            </tr>
        {/if}
        {#if flow.nodesWithHardcodedIds && flow.nodesWithHardcodedIds.length > 0}
            <tr>
                <td colspan=2>Hardcoded ids</td>
                <td colspan=1>{flow.nodesWithHardcodedIds.length}</td>
            </tr>
            <tr>
                <td colspan=3>
                    <div class="subtable">
                        <table style="width: 100%;">
                            {#each flow.nodesWithHardcodedIds as nodeWithHardcodedIds, i}
                            <tr>
                                    <td style="width: 10%">{i+1}</td>
                                    <td style="width: 45%">{nodeWithHardcodedIds.name}</td>
                                    <td style="width: 45%; text-transform: capitalize;">{nodeWithHardcodedIds.subtype}</td>
                                </tr>
                            {/each}
                        </table>
                    </div>
                </td>
            </tr>

        {/if}
        {#if flow.missingDescription}
            <tr>
                <td colspan=2>Flow description missing</td>
                <td colspan=1>1</td>
            </tr>
            <tr>
                <td colspan=3>
                    <div class="subtable">
                        <table style="width: 100%;">
                                <tr>
                                    <td style="width: 10%">1</td>
                                    <td style="width: 45%">Flow Description Missing</td>
                                    <td style="width: 45%">Metadata</td>
                                </tr>
                        </table>
                    </div>
                </td>
            </tr>
        {/if}
        {#if !flow.missingDescription}
            <tr>
                <td colspan=2>Flow description missing</td>
                <td colspan=1>0</td>
            </tr>
        {/if}
        {#if flow.missingFaultPaths && flow.missingFaultPaths.length === 0}
            <tr>
                <td colspan=2>Missing error handlers.</td>
                <td colspan=1>0</td>
            </tr>
        {/if}
        {#if flow.missingFaultPaths && flow.missingFaultPaths.length > 0}
            <tr>
                <td colspan=2>Missing error handlers</td>
                <td colspan=1>{flow.missingFaultPaths.length}</td>
            </tr>
            <tr>
                <td colspan=3>
                    <div class="subtable">
                        <table style="width: 100%;">
                            {#each flow.missingFaultPaths as missingFaultPath, i}
                                <tr>
                                    <td style="width: 10%">{i+1}</td>
                                    <td style="width: 45%">{missingFaultPath.name}</td>
                                    <td style="width: 45%; text-transform: capitalize;">{missingFaultPath.subtype}</td>
                                </tr>
                            {/each}
                        </table>
                    </div>
                </td>
            </tr>
        {/if}
        {#if flow.missingNullHandlers && flow.missingNullHandlers.length === 0}
            <tr>
                <td colspan=2>Missing null handlers</td>
                <td colspan=1>0</td>
            </tr>
        {/if}
        {#if flow.missingNullHandlers && flow.missingNullHandlers.length > 0}
            <tr>
                <td colspan=2>Missing null handlers</td>
                <td colspan=1>{flow.missingNullHandlers.length}</td>
            </tr>
            <tr>
                <td colspan=3>
                    <div class="subtable">
                        <table style="width: 100%;">
                            {#each flow.missingNullHandlers as missingNullHandler, i}
                            <tr>
                                    <td style="width: 10%">{i+1}</td>
                                    <td style="width: 45%">{missingNullHandler.name}</td>
                                    <td style="width: 45%; text-transform: capitalize;">{missingNullHandler.subtype}</td>
                                </tr>
                            {/each}
                        </table>
                    </div>
                </td>
            </tr>
        {/if}
        {#if flow.unconnectedElements && flow.unconnectedElements.length === 0}
            <tr>
                <td colspan=2>Unconnected element(s)</td>
                <td colspan=1>0</td>
            </tr>
        {/if}
        {#if flow.unconnectedElements && flow.unconnectedElements.length > 0}
            <tr>
                <td colspan=2>Unconnected elements</td>
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
                <td colspan=2>Unused variable(s)</td>
                <td colspan=1>0</td>
            </tr>
        {/if}
        {#if flow.unusedVariables && flow.unusedVariables.length > 0}
            <tr>
                <td colspan=2>Unused variables</td>
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
            <td colspan=2><br/><strong># Total Results</strong></td>
            <td colspan=1><br/><strong>{(flow.dmlStatementInLoop? flow.dmlStatementInLoop.length : 0) +
            (flow.duplicateDMLOperationsByNavigation? flow.duplicateDMLOperationsByNavigation.length: 0) +
            (flow.missingDescription? 1: 0) +
            (flow.missingFaultPaths? flow.missingFaultPaths.length: 0) +
            (flow.missingNullHandlers? flow.missingNullHandlers.length: 0) +
            (flow.nodesWithHardcodedIds? flow.nodesWithHardcodedIds.length : 0) +
            (flow.unconnectedElements? flow.unconnectedElements.length: 0) +
            (flow.unusedVariables? flow.unusedVariables.length: 0)}</strong></td>
        </tr>
        </tbody>
    </table>
</div>
{/if}
