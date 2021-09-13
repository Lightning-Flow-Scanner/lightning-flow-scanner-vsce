<script lang="ts">
    import * as core from 'lightning-flow-scanner-core/out';
    import RuleCard from "./RuleCard.svelte";

    let allRules;
    allRules = core.getRules();
    const ruleNames = allRules.map(rule => rule.name);
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
                  <span slot="label">{i+1}: {rule.label}</span>
                  <span slot="name">API name: {rule.name}</span>
                  <span slot="description">{rule.text}</span>
              </RuleCard>
          {/each}
        </ol>
    </div>
{/if}
