<script lang="ts">
    import Tooltip from './Tooltip.svelte';

    let dmlStatementInLoop = true;
    let duplicateDMLOperations = true;
    let hardcodedIds = true;
    let missingDescription = true;
    let missingFaultPaths = true;
    let missingNullHandlers = true;
    let unconnectedElements = true;
    let unusedVariables = true;

    function runRules(
        dmlStatementInLoop,
        duplicateDMLOperations,
        hardcodedIds,
        missingDescription,
        missingFaultPaths,
        missingNullHandlers,
        unconnectedElements,
        unusedVariables,
    ) {
        tsvscode.postMessage({ type: 'selectedRules',
            dmlStatementInLoop,
            duplicateDMLOperations,
            hardcodedIds,
            missingDescription,
            missingFaultPaths,
            missingNullHandlers,
            unconnectedElements,
            unusedVariables,
        })
    }
</script>

<div id="main">
    <h2>Rules:</h2>
    <p>Select the rules to be included in the scan:</p>
    <div id="options">
        <label class="option"><input type=checkbox bind:checked={dmlStatementInLoop}> DML statements in a loop </label>
        <Tooltip
                title="To avoid hitting Apex governor limits, we recommend bunching all your database changes together at the end of the flow, whether those changes create, update, or delete records."
        >
            <a href="/">?</a>
        </Tooltip>
        <br>
    </div>
</div>
<button on:click={() => runRules(

)}>Run Scan
</button>
