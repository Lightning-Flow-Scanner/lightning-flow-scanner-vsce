<script lang="ts">

    let dmlStatementInLoop = true;
    let hardcodedIds = true;
    let unconnectedElements = true;
    let unusedVariables = true;
    let missingFaultPaths = true;

    function runRules(dmlStatementInLoop, hardcodedIds, unconnectedElements, unusedVariables, missingFaultPaths) {
        tsvscode.postMessage({
            type: 'selectedRules',
            dmlStatementInLoop,
            hardcodedIds,
            unconnectedElements,
            unusedVariables,
            missingFaultPaths
        })
    }
</script>

<div id="main">
    <h2>Lint Rules</h2>
    <p>Select the rules to be included in the scan:</p>

    <div id="options">
        <label>
            <input type=checkbox bind:checked={dmlStatementInLoop}> DML statements in a loop
        </label><br/>
        <label>
            <input type=checkbox bind:checked={hardcodedIds}> Hardcoded ids
        </label><br/>
        <label>
            <input type=checkbox bind:checked={missingFaultPaths}> Missing fault paths
        </label><br/>
        <label>
            <input type=checkbox bind:checked={unconnectedElements}> Unconnected elements
        </label><br/>
        <label>
            <input type=checkbox bind:checked={unusedVariables}> Unused variables
        </label><br/>
    </div>
    <button on:click={() => runRules(
dmlStatementInLoop,
hardcodedIds,
unconnectedElements,
unusedVariables,
missingFaultPaths
)}>Run Scan
    </button>
</div>
