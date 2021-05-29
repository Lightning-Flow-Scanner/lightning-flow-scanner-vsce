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

    const rules = [
        {
            name: 'dmlStatementInLoop',
            label: 'DML statements in a loop',
            text: 'To avoid hitting Apex governor limits, we recommend bunching all your database changes together at the end of the flow, whether those changes create, update, or delete records.'
        },
        {
            name: 'duplicateDMLOperations',
            label: 'Duplicate DML operations',
            text: "If the flow commits changes to the database or performs actions between two screens, don't let users navigate from the later screen to the previous screen. Otherwise, the flow can make duplicate changes to the database."
        },
        {
            name: 'hardcodedIds',
            label: 'Hardcoded Ids',
            text: "IDs are org-specific, so don’t hard-code new or existing IDs. Instead, pass them into variables when the flow starts. You can do so, for example, by using merge fields in URL parameters or by using a Get Records element."
        },
        {
            name: 'missingDescription',
            label: 'Missing flow description',
            text: "Flow Descriptions are the closed thing to documentation. It is recommended to provide information about where it is used and what it will do."
        },
        {
            name: 'missingFaultPaths',
            label: 'Missing error handlers',
            text: "Sometimes a flow doesn’t perform an operation that you configured it to do. By default, the flow shows an error message to the user and emails the admin who created the flow. However, you can control that behavior."
        },
        {
            name: 'missingNullHandlers',
            label: 'Missing null handlers',
            text: "If a Get Records operation does not find any data it will return null. You should use decision element on that variable to check if the result is not null."
        },
        {
            name: 'unconnectedElements',
            label: 'Unconnected elements',
            text: "Removing unconnected elements which are not being used by the Flow, will make your Flow more performant and maintainable."
        },
        {
            name: 'unusedVariables',
            label: 'Unused variables',
            text: "Removing unconnected variables which are not being used by the Flow, will make your Flow more performant and maintainable."
        }
    ];

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
            <tr title={rules.find(ruleWT => ruleWT.name === "dmlStatementInLoop").text}>
                <td colspan=2>
                    DML statement(s) in a loop
                </td>
                <td>0</td>
            </tr>
        {/if}
        {#if flow.dmlStatementInLoop &&  flow.dmlStatementInLoop.length > 0}
            <tr title={rules.find(ruleWT => ruleWT.name === "dmlStatementInLoop").text}>
                <td colspan=2>
                    DML statement(s) in a loop
                </td>
                <td colspan=1>{flow.dmlStatementInLoop.length}</td>
            </tr>
            <tr title={rules.find(ruleWT => ruleWT.name === "dmlStatementInLoop").text}>
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
            <tr title={rules.find(ruleWT => ruleWT.name === "duplicateDMLOperations").text}>
                <td colspan=2>
                    Duplicate DML operations
                </td>
                <td>0</td>
            </tr>
        {/if}
        {#if flow.duplicateDMLOperationsByNavigation &&  flow.duplicateDMLOperationsByNavigation.length > 0}
            <tr title={rules.find(ruleWT => ruleWT.name === "duplicateDMLOperations").text}>
                <td colspan=2>
                    Duplicate DML operations
                </td>
                <td colspan=1>{flow.duplicateDMLOperationsByNavigation.length}</td>
            </tr>
            <tr title={rules.find(ruleWT => ruleWT.name === "duplicateDMLOperations").text}>
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
            <tr title={rules.find(ruleWT => ruleWT.name === "hardcodedIds").text}>
                <td colspan=2>
                    Hardcoded Ids
                </td>
                <td colspan=1>0</td>
            </tr>
        {/if}
        {#if flow.nodesWithHardcodedIds && flow.nodesWithHardcodedIds.length > 0}
            <tr title={rules.find(ruleWT => ruleWT.name === "hardcodedIds").text}>
                <td colspan=2>
                    Hardcoded Ids
                </td>
                <td colspan=1>{flow.nodesWithHardcodedIds.length}</td>
            </tr>
            <tr title={rules.find(ruleWT => ruleWT.name === "hardcodedIds").text}>
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
            <tr title={rules.find(ruleWT => ruleWT.name === "missingDescription").text}>
                <td colspan=2>
                    Missing flow description
                </td>
                <td colspan=1>1</td>
            </tr>
            <tr title={rules.find(ruleWT => ruleWT.name === "missingDescription").text}>
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
            <tr title={rules.find(ruleWT => ruleWT.name === "missingDescription").text}>
                <td colspan=2>
                    Missing flow description
                </td>
                <td colspan=1>0</td>
            </tr>
        {/if}
        {#if flow.missingFaultPaths && flow.missingFaultPaths.length === 0}
            <tr title={rules.find(ruleWT => ruleWT.name === "missingFaultPaths").text}>
                <td colspan=2 >
                    Missing error handlers
                </td>
                <td colspan=1>0</td>
            </tr>
        {/if}
        {#if flow.missingFaultPaths && flow.missingFaultPaths.length > 0}
            <tr title={rules.find(ruleWT => ruleWT.name === "missingFaultPaths").text}>
                <td colspan=2>
                    Missing error handlers
                </td>
                <td colspan=1>{flow.missingFaultPaths.length}</td>
            </tr>
            <tr title={rules.find(ruleWT => ruleWT.name === "missingFaultPaths").text}>
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
            <tr title={rules.find(ruleWT => ruleWT.name === "missingNullHandlers").text}>
                <td colspan=2>
                    Missing null handlers
                </td>
                <td colspan=1>0</td>
            </tr>
        {/if}
        {#if flow.missingNullHandlers && flow.missingNullHandlers.length > 0}
            <tr title={rules.find(ruleWT => ruleWT.name === "missingNullHandlers").text}>
                <td colspan=2>
                    Missing null handlers
                </td>
                <td colspan=1>{flow.missingNullHandlers.length}</td>
            </tr>
            <tr title={rules.find(ruleWT => ruleWT.name === "missingNullHandlers").text}>
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
            <tr title={rules.find(ruleWT => ruleWT.name === "unconnectedElements").text}>
                <td colspan=2>
                    Unconnected elements
                </td>
                <td colspan=1>0</td>
            </tr>
        {/if}
        {#if flow.unconnectedElements && flow.unconnectedElements.length > 0}
            <tr title={rules.find(ruleWT => ruleWT.name === "unconnectedElements").text}>
                <td colspan=2>
                    Unconnected elements
                </td>
                <td colspan=1>{flow.unconnectedElements.length}</td>
            </tr>
            <tr title={rules.find(ruleWT => ruleWT.name === "unconnectedElements").text}>
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
            <tr title={rules.find(ruleWT => ruleWT.name === "unusedVariables").text}>
                <td colspan=2>
                    Unused variables
                </td>
                <td colspan=1>0</td>
            </tr>
        {/if}
        {#if flow.unusedVariables && flow.unusedVariables.length > 0}
            <tr title={rules.find(ruleWT => ruleWT.name === "unusedVariables").text}>
                <td colspan=2>
                    Unused variables
                </td>
                <td colspan=1>{flow.unusedVariables.length}</td>
            </tr>
            <tr title={rules.find(ruleWT => ruleWT.name === "unusedVariables").text}>
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
