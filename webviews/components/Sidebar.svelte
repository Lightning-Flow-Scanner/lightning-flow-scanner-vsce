{#if show}
    <nav transition:fly={{x: 350, opacity: 1}}>
        <ol>
            <input type="checkbox" id="select-all" checked={selectedRules.size === ruleNames.length}
                   on:change={onSelectAll}>
            <label for="select-all"><strong>Select all</strong></label>
            {#each ruleNames as rule}
                <li>
                    <input type="checkbox" id={rule} value={rule} checked={selectedRules.has(rule)}>
                    <label for={rule}>{rules.find(ruleWT => ruleWT.name === rule).label}</label>
                    <Tooltip
                            title={rules.find(ruleWT => ruleWT.name === rule).text}
                    >
                        <a class="tooltip" href="/">?</a>
                    </Tooltip>
                </li>
            {/each}
        </ol>
    </nav>
{/if}


<script>
    import {fly} from 'svelte/transition';
    import Tooltip from "./Tooltip.svelte";
    import * as core from 'lightningflowscan-core/out';

    let rules = core.getRuleDefinitions();
    export let selectedRules = new Set(rules.map(rule => rule.name));
    let ruleNames = rules.map(rule => rule.name);

    export let show = true;
    function onSelectAll(event) {
        // if (event.target.checked) {
        //     selectedRules = new Set(ruleNames);
        // } else {
        //     selectedRules.clear();
        // }
        // selectedRules = selectedRules;
    }

</script>
