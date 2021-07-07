<script lang="ts">
    import Tooltip from "./Tooltip.svelte";
    import * as core from 'lightningflowscan-core/out';
    import RuleCard from "./RuleCard.svelte";

    let allRules = core.getRuleDefinitions();
    const ruleNames = allRules.map(rule => rule.name);
</script>

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
