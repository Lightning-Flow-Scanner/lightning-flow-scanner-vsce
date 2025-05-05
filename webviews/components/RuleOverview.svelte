<script lang="ts">
    import { getRules, getBetaRules } from "lightning-flow-scanner-core";
    import RuleCard from "./RuleCard.svelte";

    const allRules = getRules();
    const betaRules = getBetaRules();
</script>

{#if !allRules}
<p> no rules </p>

{/if}

{#if betaRules}
    <div id="beta">
        <h2>Beta Rules</h2>
        <h3>Modify your .flow-scanner configuration file to take advantage of the beta rules</h3>
        {#each betaRules as rule, i}
            <RuleCard>
                <span slot="label">{i + 1}. {rule.label}</span>
                <span slot="config"> <a href={rule.uri}>{rule.name}</a></span>
                <span slot="description">{rule.description}</span>
                <span slot="docRefs">
                    <ul>
                        {#each rule.docRefs as docRef}
                        <li><a href={docRef.path}>{docRef.label}</a></li>
                        {/each}
                    </ul>
                </span>
            </RuleCard>
        {/each}
    </div>
{/if}
{#if allRules}
    <div id="main">
        <h2>Default Rules</h2>
        {#each allRules as rule, i}
            <RuleCard>
                <span slot="label">{i + 1}. {rule.label}</span>
                <span slot="config"> <a href={rule.uri}>{rule.name}</a></span>
                <span slot="description">{rule.description}</span>
                <span slot="docRefs">
                    <ul>
                        {#each rule.docRefs as docRef}
                        <li><a href={docRef.path}>{docRef.label}</a></li>
                        {/each}
                    </ul>
                </span>
            </RuleCard>
        {/each}
    </div>
{/if}
