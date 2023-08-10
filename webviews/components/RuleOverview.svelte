<script lang="ts">
    import * as core from 'lightning-flow-scanner-core/out';
    import RuleCard from "./RuleCard.svelte";

    const allRules = core.getRules();
</script>

{#if !allRules}
    <div class="centered">
        <div class="loader"></div>
    </div>
{/if}

{#if allRules}
    <div id="main">
        <h2>Lightning Flow Scanner Default Rules</h2>
          {#each allRules as rule, i}
              <RuleCard>
                  <span slot="label">{i+1}. {rule.label}</span>
                  <span slot="config"> <a href={rule.uri}>{rule.name}</a></span>
                  <span slot="description">{rule.description}</span>
                  <!-- <span slot="docRefs"> -->
                          <!-- <p><strong>Related articles:</strong></p>
                          {#each rule.docRefs as docRef}
                              <a href={docRef.path}>{docRef.label}</a>
                          {/each}
                      {/if} --> 
                  <!-- </span> -->
              </RuleCard>
          {/each}
    </div>
{/if}
