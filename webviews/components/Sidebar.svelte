{#if show}
    <nav transition:fly={{x: 350, opacity: 1}}>
        <ol>
            <input type="checkbox" id="select-all" checked={selectedRules.size === ruleNames.length}
                   on:change={onSelectAll}>
            <label for="select-all"><strong>Select all</strong></label>
            {#each ruleNames as rule}
                <li>
                    <input type="checkbox" id={rule} value={rule} checked={selectedRules.has(rule)}
                           on:change={onCheckRule}>
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

    const rules = [
        {
            name: 'dmlStatementInLoop',
            label: 'DML statements in a loop',
            text: 'To avoid hitting Apex governor limits, we recommend bunching all your database changes together at the end of the flow, whether those changes create, update, or delete records.'
        },
        {
            name: 'duplicateDMLOperations',
            label: 'Duplicate DML operations',
            text: "If the flow commits changes to the database or performs actions between two screens, don't let users navigate from the later screen to the previous screen. Otherwise, the flow can make duplicate changes to the database."
        },
        {
            name: 'hardcodedIds',
            label: 'Hardcoded Ids',
            text: "IDs are org-specific, so don’t hard-code new or existing IDs. Instead, pass them into variables when the flow starts. You can do so, for example, by using merge fields in URL parameters or by using a Get Records element."
        },
        {
            name: 'missingDescription',
            label: 'Missing flow description',
            text: "Flow Descriptions are the closed thing to documentation. It is recommended to provide information about where it is used and what it will do."        },
        {
            name: 'missingFaultPaths',
            label: 'Missing error handlers',
            text: "Sometimes a flow doesn’t perform an operation that you configured it to do. By default, the flow shows an error message to the user and emails the admin who created the flow. However, you can control that behavior."
        },
        {
            name: 'missingNullHandlers',
            label: 'Missing null handlers',
            text: "If a Get Records operation does not find any data it will return null. You should use decision element on that variable to check if the result is not null."
        },
        {
            name: 'unconnectedElements',
            label: 'Unconnected elements',
            text: "Removing unconnected elements which are not being used by the Flow, will make your Flow more performant and maintainable."
        },
        {
            name: 'unusedVariables',
            label: 'Unused variables',
            text: "Removing unconnected variables which are not being used by the Flow, will make your Flow more performant and maintainable."
        }
    ];
    const ruleNames = rules.map(rule => rule.name);
    export let selectedRules = new Set(ruleNames);
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