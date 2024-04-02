<script lang="ts">
    import { onMount } from "svelte";
    import NavigationBanner from "./Navigation.svelte";
    import ViolationTable from "./ViolationTable.svelte";
    import ViolationTableFull from "./ViolationTableFull.svelte";

    let results;
    let scanResults;
    let allResults;
    let showFlowName: boolean;
    onMount(() => {
        tsvscode.postMessage({ type: "init-view" });
    });

    let banner;

    $: {
        let details = [];
        if (scanResults) {
            if (scanResults.length > 1) {
                showFlowName = true;
            } else {
                showFlowName = false;
            }
            for (let scanResult of scanResults) {
                for (let ruleResult of scanResult.ruleResults) {
                    let ruleDescription = ruleResult.ruleDefinition.description;
                    let ruleLabel = ruleResult.ruleDefinition.label;
                    let flowName = scanResult.flow.name;
                    let type;
                    let metaType;
                    let name;
                    let dataType = "";
                    let locationX = "";
                    let locationY = "";
                    let connectsTo = "";
                    let expression = "";

                    let initobj = {
                        ruleDescription,
                        ruleLabel,
                        flowName,
                    };
                    if (ruleResult.occurs) {
                        for (let detail of ruleResult.details) {
                            name = detail.name ? detail.name : "";
                            type = detail.type;
                            metaType = detail.metaType;
                            if (detail.details) {
                                if (detail.details.dataType) {
                                    dataType = detail.details.dataType;
                                }
                                if (detail.details.locationX) {
                                    locationX = detail.details.locationX;
                                }
                                if (detail.details.locationY) {
                                    locationY = detail.details.locationY;
                                }
                                if (detail.details.connectsTo) {
                                    connectsTo =
                                        detail.details.connectsTo.join();
                                }
                                if (detail.details.expression) {
                                    expression = detail.details.expression;
                                }
                            }
                            const detailObj = Object.assign(
                                structuredClone(initobj),
                                {
                                    name,
                                    type,
                                    metaType,
                                    dataType,
                                    locationX,
                                    locationY,
                                    connectsTo,
                                    expression,
                                }
                            );
                            details.push(detailObj);
                        }
                    }
                }
            }
        }
        allResults = details;
    }

    function windowMessage(event) {
        const message = event.data;
        switch (message.type) {
            case "init":
                const state = tsvscode.getState();
                if (state) {
                    scanResults = state.value;
                } else {
                    scanResults = message.value;
                }
                return;
            case "update":
                scanResults = message.value;
                tsvscode.setState({ scanResults });
                return;
        }
    }
</script>

<svelte:window on:message={windowMessage} />
<NavigationBanner
    currentPage="viewAll"
    showDownload
    bind:this={banner}
    on:navigate={(e) => banner.navigate(e, scanResults)}
    on:download={() => results.download()}
/>
{#if allResults && allResults.length > 0}
    {#if showFlowName}
        <ViolationTableFull bind:this={results} bind:allResults />
    {:else}
        <ViolationTable bind:this={results} bind:allResults />
    {/if}
{/if}
