<script lang="ts">
    import ViolationDetails from "./ViolationDetails.svelte";
    export let ruleResult;
</script>

<table style="width: 100%;">
  {#if ruleResult.details && ruleResult.type === 'pattern'}
    {#each ruleResult.details as result, i}
        <ViolationDetails bind:result={result} nr={i+1}>
        </ViolationDetails>
    {/each}
  {:else}
      <thead>
      <tr>
          <th colspan=1 style="width: 10%">#</th>
          <th colspan=1 style="width: 40%">current</th>
          <th colspan=1 style="width: 40%">type</th>
      </tr>
      </thead>
      <tr>
          <td style="width: 10%">1</td>
          <td style="width: 40%">{ruleResult.details}</td>
          <td style="width: 40%; text-transform: capitalize;">{ruleResult.ruleName}</td>
      </tr>
  {/if}
</table>
