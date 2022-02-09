<script lang="ts">
    import ViolationDetails from "./ViolationDetails.svelte";

    export let ruleResult;

    let showDetails = false;

    function updateShowDetails() {
        showDetails = !showDetails;
    }

</script>

<table style="width: 100%;">

  {#if ruleResult.details && ruleResult.type !== 'error'}
    {#each ruleResult.details as result, i}
        <ViolationDetails bind:result={result} nr={i+1}>
        </ViolationDetails>
    {/each}
  {:else}
      <thead>
      <tr>
          <th colspan=1 style="width: 10%">#</th>
          <th colspan=1 style="width: 40%">name</th>
          <th colspan=1 style="width: 40%">type</th>
          <th colspan=1 style="width: 10%">details</th>
      </tr>
      </thead>
    {#if ruleResult.type === 'error'}
        <tr>
            <td style="width: 10%">1</td>
            <td style="width: 40%">Error</td>
            <td style="width: 40%; text-transform: capitalize;">{ruleResult.details[0]}</td>
            <td style="width: 10%;"></td>
        </tr>
    {:else}
      <tr>
          <td style="width: 10%">1</td>
          <td style="width: 40%">undefined</td>
          <td style="width: 40%; text-transform: capitalize;">Description</td>
          <td style="width: 10%;"></td>
      </tr>
    {/if}
  {/if}
</table>
