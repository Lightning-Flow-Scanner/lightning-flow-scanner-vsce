<script lang="typescript">
    import { TabulatorFull as Tabulator } from "tabulator-tables";
    import { onMount } from "svelte";

    export let allResults;
    let tableComponent;

    onMount(() => {
        console.log('mount');
        new Tabulator(tableComponent, {
            data: allResults,
            reactiveData: true,
            layout: "fitColumns",
            columns: [
                {
                    title: "Violation",
                    field: "violation",
                },
                {
                    title: "Violation Label",
                    field: "ruleLabel",
                },
                {
                    title: "Description",
                    field: "ruleDescription",
                },
                {
                    title: "Flow name",
                    field: "flowName",
                }
            ]
        });
    });
</script>

<div bind:this={tableComponent} />