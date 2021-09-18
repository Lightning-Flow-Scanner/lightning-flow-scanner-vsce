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
                  <span slot="uri">Source code: <a href={rule.uri}>{rule.name}</a></span>
                  <span slot="docRefs">
                      {#if rule.docRefs.length > 0}
                          <p><strong>Related articles:</strong></p>
                          {#each rule.docRefs as docRef}
                              <a href={docRef.path}>{docRef.label}</a>
                          {/each}
                      {/if}
                  </span>
              </RuleCard>
          {/each}
        </ol>
    </div>
{/if}
