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

            console.log('process sr');
            // {#each scanResult.ruleResults as ruleResult}
            for(let ruleResult of scanResult.ruleResults){

                console.log(ruleResult);
                let ruleDescription = ruleResult.ruleDescription;
                let ruleLabel = ruleResult.ruleLabel;
                let flowName = scanResult.flow.name;
                let violation;
                let type;
 

                let initobj = {
                    ruleDescription,
                    ruleLabel,
                    flowName
                }

                if(ruleResult.type === 'pattern' && ruleResult.details ){
                    console.log('pattern');
                    for(let detail of ruleResult.details){
                        violation = detail.name;
                        type = detail.subtype;
                        const detailObj = Object.assign(structuredClone(initobj), {violation, type});
                        details.push(detailObj);
                    }
                } else if(ruleResult.type === 'flow' && ruleResult.details){
                    console.log('pattern');
                    violation = ruleResult.details;
                    // todo type should be expression
                    const detailObj = Object.assign(structuredClone(initobj), {violation});
                    details.push(detailObj);
                }

            }
        }
        console.log(details);
        allResults = details;
    }

    function windowMessage(event) {
        const message = event.data;
        switch (message.type) {
            case 'init':
                const state = tsvscode.getState();
                if (state) {
                    scanResult = state.value;
                } else {
                    scanResult = message.value;
                }
                dataType = message.dataType;
                return;
            case 'update':
                scanResult = message.value;
                tsvscode.setState({scanResult});
                return;
        }
    }

</script>

<svelte:window on:message={windowMessage}/>

<Banner></Banner>
{#if allResults && allResults.length > 0}
<ViolationTable bind:allResults />
{/if}