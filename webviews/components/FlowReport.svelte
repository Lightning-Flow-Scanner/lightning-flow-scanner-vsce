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
            <thead>
            <tr>
                <th colspan=2>Rule</th>
                <th colspan=1># Results</th>
            </tr>
            </thead>
            <tbody>
            {#each flow.scanResults as scanResult}
              <tr title={scanResult.ruleDescription}>
                  <td colspan=2>
                      {scanResult.ruleLabel}
                  </td>
                  <td colspan=1>
                    {scanResult.resultCount}
                  </td>
              </tr>
              <tr title={scanResult.ruleDescription}>
                  <td colspan=3>
                      <div class="subtable">
                          <table style="width: 100%;">
                            {#each scanResult.results as result, i}
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
                    <td colspan=1><br/><strong>{flow.resultCount}</strong></td>
                </tr>
            </tbody>
    </table>
</div>
{/if}

        <!--        {#if flow.unusedVariables || flow.unconnectedElements }-->
<!--            <caption>-->
<!--                <button on:click={() => autoFix(flow)}>-->
<!--                    Auto Fix-->
<!--                </button>-->
<!--            </caption>-->
<!--        {/if}-->
