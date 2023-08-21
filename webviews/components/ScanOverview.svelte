<script lang="typescript">
    import {onMount} from 'svelte';
    import * as core from 'lightning-flow-scanner-core/out';
    import ScanResultTable from "./ScanResultTable.svelte";
    import Banner from "./Banner.svelte";
    import Select from 'svelte-select';
	
    onMount(() => tsvscode.postMessage({type: 'init-view'}));
    let sortByColumn = "label";
    let sortByAscending= false;
    let scanResults;
    let items = core.getRules().map(rule => {return {'label':rule.label, 'value':rule.name}});
	let value =[...items];

    $: {
        if(scanResults){
            scanResults.forEach(scanResult => {
                scanResult.resultCount = scanResult.ruleResults.reduce((total, rule) => {
                    let selectedValues = value.map(val => val.value);
                    console.log(selectedValues);
                    if(selectedValues.includes(rule.ruleName)){
                        console.log(rule.ruleName);
                        if(rule.details && rule.type === 'pattern'){
                            total = (total + rule.details.length)
                        } else if(rule.details && rule.type === 'flow'){
                            total = (total + 1)
                        }
                    }
                    return total;
                }, 0);
                scanResult.label = scanResult.flow.label[0];
                scanResult.type = scanResult.flow.type[0];
            });
            scanResults = scanResults;
        }
    }

    function windowMessage(event) {
        const message = event.data;
        switch (message.type) {
            case 'init':
                scanResults = message.value;
                return;
            case 'update':
                scanResults = message.value;
                return;
        }
    }

    function goToFile(flow) {
        tsvscode.postMessage({
            type: 'goToFile',
            value: flow
        })
    }

    function goToDetails(scanResult) {
        tsvscode.postMessage({
            type: 'goToDetails',
            value: scanResult
        })
    }

    function sort(column) {
        if (sortByColumn === column) {
            sortByAscending = !sortByAscending;
        } else {
            sortByColumn = column;
            sortByAscending = true;
        }

        let sortModifier = (sortByAscending) ? 1 : -1;
        let sort = (a, b) =>
        (a[column] < b[column])
                ? -1 * sortModifier
                : (a[column] > b[column])
                ? 1 * sortModifier
                : 0;
        scanResults = scanResults.sort(sort);
    }

</script>

<svelte:window on:message={windowMessage} />

<Banner></Banner>

<Select {items} multiple={true} bind:value />

{#if !scanResults}
<div class="centered">
    <div class="loader"></div>
</div>
{/if}
{#if scanResults && scanResults.length > 0}
    <ScanResultTable bind:scanResults={scanResults}></ScanResultTable>
{/if}