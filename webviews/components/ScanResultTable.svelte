<script lang="typescript">
    import { TabulatorFull as Tabulator } from "tabulator-tables";
    import { onMount } from "svelte";

    export let scanResults;
    let tableComponent;

    onMount(() => {
        new Tabulator(tableComponent, {
            data: scanResults, //link data to table
            reactiveData: true, //enable data reactivity
            layout:"fitColumns",
            columns: [
                //Define Table Columns
                {
                    title: "# Results",
                    field: "resultCount",
                    hozAlign: "left",
                },
                { title: "Label", field: "label", formatter: "plaintext" },
                { title: "Flow Type", field: "type", formatter: "plaintext" },
                {
                    title: "% Test Coverage",
                    field: "coverage"
                }
            ],
        });
    });
</script>

<div bind:this={tableComponent}></div>