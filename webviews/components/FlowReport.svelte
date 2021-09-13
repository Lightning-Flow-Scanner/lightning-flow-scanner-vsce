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
            <caption>
                <button on:click={() => goToFile(scanResult.flow)}>Go To File</button>
            </caption>
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
                      {(ruleResult.details ?ruleResult.details.length: 1)}
                    </td>
                </tr>
                <tr title={ruleResult.ruleDescription}>
                    <td colspan=3>
                        <div class="subtable">
                        <table style="width: 100%;">
                          {#if ruleResult.details}
                                {#each ruleResult.details as result, i}
                                      <tr>
                                          <td style="width: 10%">{i+1}</td>
                                          <td style="width: 45%">{result.name}</td>
                                          <td style="width: 45%; text-transform: capitalize;">{result.subtype}</td>
                                      </tr>
                                  {#if result.element}
                                      <tr>
                                          <td colspan=3>
                                              <div class="detailtable">
                                                  <table style="width: 100%;">
                                                    {#if result.element["locationX"] && result.element["locationY"]}
                                                        <tr>
                                                            <td style="width: 50%;">Coordinates</td>
                                                            <td style="width: 50%;">X: {result.element["locationX"]}
                                                                Y: {result.element["locationY"]}</td>
                                                        </tr>
                                                    {/if}
                                                    {#if result.element["connector"]}
                                                        <tr>
                                                            <td style="width: 50%;">Connects to</td>
                                                            <td style="width: 50%;">{result.element["connector"][0]["targetReference"][0]}</td>
                                                        </tr>
                                                    {/if}
                                                  </table>
                                              </div>
                                          </td>
                                      </tr>
                                  {/if}
                                {/each}
                          {:else}
                              <tr>
                                  <td style="width: 10%">1</td>
                                  <td style="width: 45%"></td>
                                  <td style="width: 45%; text-transform: capitalize;">Description</td>
                              </tr>
                          {/if}
                        </table>


                        </div>
                    </td>
                </tr>
            {/each}
            <tr>
                <td colspan=2><br/><strong># Total Results</strong></td>
                <td colspan=1>
                    <br/><strong>{scanResult.ruleResults.reduce((a, b) => a + (b.details ? b.details.length : 1), 0)}</strong>
                </td>
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
