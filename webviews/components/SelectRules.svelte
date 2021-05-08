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
    <h2>Lint Rules</h2>
    <p>Select the rules to be included in the scan:</p>
    <div id="options">
        <label class="option"><input type=checkbox bind:checked={dmlStatementInLoop}> DML statements in a loop </label>
        <Tooltip
                title="To avoid hitting Apex governor limits, we recommend bunching all your database changes together at the end of the flow, whether those changes create, update, or delete records."
        >
            <a href="/">?</a>
        </Tooltip>
        <br>
        <label class="option"><input type=checkbox bind:checked={duplicateDMLOperations}>Duplicate changes by navigation.</label>
        <Tooltip
                title="If the flow commits changes to the database or performs actions between two screens, don't let users navigate from the later screen to the previous screen. Otherwise, the flow can make duplicate changes to the database."        >
            <a href="/">?</a>
        </Tooltip>
        <br>
        <label class="option"><input type=checkbox bind:checked={hardcodedIds}> Hardcoded ids</label>
        <Tooltip
                title="IDs are org-specific, so don’t hard-code new or existing IDs. Instead, pass them into variables when the flow starts. You can do so, for example, by using merge fields in URL parameters or by using a Get Records element."
        >
            <a href="/">?</a>
        </Tooltip>
        <br>
        <label class="option"><input type=checkbox bind:checked={missingDescription}> Missing description</label>
        <Tooltip
                title="Flow Descriptions are the closed thing to documentation. It is recommended to provide information about where it is used and what it will do."
        >
            <a href="/">?</a>
        </Tooltip>
        <br>
        <label class="option"><input type=checkbox bind:checked={missingFaultPaths}> Missing error handlers</label>
        <Tooltip
                title="Sometimes a flow doesn’t perform an operation that you configured it to do. By default, the flow shows an error message to the user and emails the admin who created the flow. However, you can control that behavior."
        >
            <a href="/">?</a>
        </Tooltip>
        <br>
        <label class="option"><input type=checkbox bind:checked={missingNullHandlers}> Missing null handlers</label>
        <Tooltip
                title="If a Get Records operation does not find any data it will return null. You should use decision element on that variable to check if the result is not null."
        >
            <a href="/">?</a>
        </Tooltip>
        <br>
        <label class="option"><input type=checkbox bind:checked={unconnectedElements}> Unconnected elements</label>
        <Tooltip
                title="Removing unconnected elements that are not used by the Flow, will make your Flow more performant and maintainable."
        >
            <a href="/">?</a>
        </Tooltip>
        <br>

        <label class="option"><input type=checkbox bind:checked={unusedVariables}> Unused variables</label>
        <Tooltip
                title="Removing unconnected elements that are not used by the Flow, will make your Flow more performant and maintainable."
        >
            <a href="/">?</a>
        </Tooltip>
        <br>
    </div>
</div>
<button on:click={() => runRules(
dmlStatementInLoop,
duplicateDMLOperations,
hardcodedIds,
missingDescription,
missingFaultPaths,
missingNullHandlers,
unconnectedElements,
unusedVariables,
)}>Run Scan
</button>
