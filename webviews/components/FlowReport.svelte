<script lang="ts">
    import RuleDetails from "./RuleDetails.svelte";
    import {onMount} from 'svelte';
    onMount(() => {
        tsvscode.postMessage({
            type: 'init-view',
        });
    });
    let dataType = "";
    let scanResult;

    function windowMessage(event) {
        const message = event.data;
        switch (message.type) {
            case 'init':
                const state = tsvscode.getState();
                if (state) {
                    scanResult = state.value;
                } else {
                    scanResult = message.value;
                }
                dataType = message.dataType;
                return;
            case 'update':
                scanResult = message.value;
                tsvscode.setState({scanResult});
                return;
        }
    }

    function goToFile(flow) {
        tsvscode.postMessage({
            type: 'goToFile',
            value: flow
        })
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
                {#if ruleResult.type === 'flow'}
                <td colspan=1>
                    {(ruleResult.occurs ? 1 : 0)}
                </td>
                {/if}
                {#if ruleResult.type === 'pattern'}
                <td colspan=1>
                    {(ruleResult.occurs ? ruleResult.details.length : 0)}
                </td>
                {/if}
            </tr>
                
                  {#if ruleResult.details && ruleResult.details.length > 0}
                      <tr title={ruleResult.ruleDescription}>
                          <td colspan=3>
                              <div class="subtable">
                                  <p>{ruleResult.ruleDescription}</p>
                                  <br>
                                  <RuleDetails bind:ruleResult={ruleResult}>
                                  </RuleDetails>
                              </div>
                          </td>
                      </tr>
                  {/if} 
            {/each}
            <tr>
                <td colspan=2><br/><strong># Total Results</strong></td>
                <td colspan=1>
                    <br/><strong>
                        {scanResult.resultCount}
                    </strong>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <button on:click={() => goToFile(scanResult.flow)}>Go To File</button>
{/if}
        <!--        {#if scanResult.unusedVariables || scanResult.unconnectedElements }-->
<!--            <caption>-->
<!--                <button on:click={() => autoFix(scanResult)}>-->
<!--                    Auto Fix-->
<!--                </button>-->
<!--            </caption>-->
<!--        {/if}-->