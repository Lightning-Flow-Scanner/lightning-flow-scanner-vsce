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
        <ol>
          {#each allRules as rule, i}
              <RuleCard>
                  <span slot="label">{rule.label}</span>
                  <span slot="description">{rule.text}</span>
                  <span slot="doc"><a href={rule.docRef}>Documentation</a></span>
                  <span slot="uri"><a href={rule.uri}>Source code</a></span>
              </RuleCard>
          {/each}
        </ol>
    </div>
{/if}
