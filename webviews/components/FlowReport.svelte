<script lang="ts">
    import {onMount} from 'svelte';

    onMount(() => {
        tsvscode.postMessage({
            type: 'init-view',
        });
    });
    let dataType = "";
    let scanResult;

    function windowMessage(event) {
        const message = event.data; // The json data that the extension sent
        switch (message.type) {
            case 'init':
                //the extension is sending us an init event with the document text
                //note: this is the document NOT the state, the state takes precendece, so if any state exists use that instead
                const state = tsvscode.getState();
                if (state) {
                    //we push this state from the vscode workspace to the JSON this component is looking at
                    scanResult = state.value;
                } else {
                    //use the state data
                    scanResult = message.value;
                }
                dataType = message.dataType;
                return;
            case 'update':
                //assign data
                scanResult = message.value;
                // assign state
                tsvscode.setState({scanResult});
                return;
        }
    }

    function autoFix(scanResult) {
        tsvscode.postMessage({
            type: 'autofix',
            value: scanResult
        });
    }
</script>

<svelte:window on:message={windowMessage}/>

{#if scanResult}
<div class="main">
        <table>
            <thead>
            <tr>
                <th colspan=2>Rule</th>
                <th colspan=1># Results</th>
            </tr>
            </thead>
            <tbody>
            {#each scanResult.ruleResults as ruleResult}
              <tr title={ruleResult.ruleDescription}>
                  <td colspan=2>
                      {ruleResult.ruleLabel}
                  </td>
                  <td colspan=1>
                    {ruleResult.results.length}
                  </td>
              </tr>
              <tr title={ruleResult.ruleDescription}>
                  <td colspan=3>
                      <div class="subtable">
                          <table style="width: 100%;">
                            {#each ruleResult.results as result, i}
                                <tr>
                                    <td style="width: 10%">{i+1}</td>
                                    <td style="width: 45%">{result.name}</td>
                                    <td style="width: 45%; text-transform: capitalize;">{result.subtype}</td>
                                </tr>
                            {/each}
                          </table>
                      </div>
                  </td>
              </tr>
            {/each}
                <tr>
                    <td colspan=2><br/><strong># Total Results</strong></td>
                    <td colspan=1><br/><strong>{scanResult.ruleResults.reduce((a, b) => a + b.results.length, 0)}</strong></td>
                </tr>
            </tbody>
    </table>
</div>
{/if}

        <!--        {#if scanResult.unusedVariables || scanResult.unconnectedElements }-->
<!--            <caption>-->
<!--                <button on:click={() => autoFix(scanResult)}>-->
<!--                    Auto Fix-->
<!--                </button>-->
<!--            </caption>-->
<!--        {/if}-->
