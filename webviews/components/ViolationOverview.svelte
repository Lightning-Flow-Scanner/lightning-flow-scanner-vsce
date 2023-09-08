<script lang="ts">
    import { onMount } from "svelte";
    import Banner from "./Banner.svelte";
    import ViolationTable from "./ViolationTable.svelte";
    let dataType = "";
    let scanResult;
    let allResults;
    onMount(() => {
        tsvscode.postMessage({ type: "init-view" });
    });

    $: {
        let details = [];
        if (scanResult) {
            for (let ruleResult of scanResult.ruleResults) {
                let ruleDescription = ruleResult.ruleDefinition.description;
                let ruleLabel = ruleResult.ruleDefinition.label;
                let flowName = scanResult.flow.name;
                let name;
                let type;
                let metaType;

                let dataType;
                let locationX;
                let locationY;
                let connectsTo;
                let expression;

                let initobj = {
                    ruleDescription,
                    ruleLabel,
                    flowName,
                };
                for (let detail of ruleResult.details) {
                    
                    name = detail.name;
                    type = detail.type;
                    metaType = detail.metaType;
                    if (detail.details) {
                        console.debug(ruleResult);

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
                            connectsTo = detail.details.connectsTo.join();
                        }
                        if (detail.details.expression) {
                            expression = detail.details.expression;
                        }
                    }
                    const detailObj = Object.assign(structuredClone(initobj), {
                        name,
                        type,
                        metaType,
                        dataType,
                        locationX,
                        locationY,
                        connectsTo,
                        expression,
                    });
                    details.push(detailObj);
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
                    scanResult = state.value;
                } else {
                    scanResult = message.value;
                }
                dataType = message.dataType;
                return;
            case "update":
                scanResult = message.value;
                tsvscode.setState({ scanResult });
                return;
        }
    }
</script>

<svelte:window on:message={windowMessage} />

<Banner />
{#if allResults && allResults.length > 0}
    <ViolationTable bind:allResults />
{/if}
