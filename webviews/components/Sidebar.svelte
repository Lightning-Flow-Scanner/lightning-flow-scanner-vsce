{#if show}
    <nav transition:fly={{x: 350, opacity: 1}}>
        <ol>
            <input type="checkbox" id="select-all" checked={allRules.length === selectedRules.size}
                   on:change={onSelectAll}>
            <label for="select-all"><strong>Select all</strong></label>
            {#each allRules as rule}
                <li>
                    <input type="checkbox" id={rule.name} value={rule.name} checked={selectedRules.has(rule.name)} on:change={onCheckRule}>
                    <label for={rule}>{rule.label}</label>
                    <Tooltip
                            title={rule.text}
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
    import * as core from 'lightning-flow-scanner-core/out';

    let allRules = core.getRules();
    const ruleNames = allRules.map(rule => rule.name);
    export let selectedRules;
    export let show = true;

    function onCheckRule(event) {
        if (event.target.checked) {
            selectedRules.add(event.target.value);

        } else {
            selectedRules.delete(event.target.value);
        }
        selectedRules = selectedRules;
    }

    function onSelectAll(event) {
        if (event.target.checked) {
            selectedRules = new Set(ruleNames);
        } else {
            selectedRules.clear();
        }
        selectedRules = selectedRules;
    }
</script>
