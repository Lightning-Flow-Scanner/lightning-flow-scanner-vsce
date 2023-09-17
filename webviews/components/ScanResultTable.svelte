<script lang="typescript">
    import { TabulatorFull as Tabulator } from "tabulator-tables";
    import { onMount } from "svelte";

    export let scanResults;
    let tableComponent;

    var detailButton = function (cell, formatterParams, onRendered) {
        return `<button style="background-color: #2765ae;">details</button>`;
    };

    onMount(() => {
        new Tabulator(tableComponent, {
            data: scanResults,
            reactiveData: true,
            layout: "fitColumns",
            columns: [
                {
                    title: "# Results",
                    field: "resultCount",
                    hozAlign: "left",
                    bottomCalc: "count",
                },
                {
                    title: "Label",
                    field: "label",
                    formatter: "link",
                    cellClick: function (e, cell) {
                        tsvscode.postMessage({
                            type: "goToFile",
                            value: cell.getRow().getData().flow,
                        });
                    },
                },
                { title: "Flow Type", field: "type", formatter: "plaintext" },
                {
                    title: "% Test Coverage",
                    field: "coverage",
                },
                {
                    title: "Details",
                    formatter: detailButton,
                    width: 100,
                    hozAlign: "center",
                    cellClick: function (e, cell) {
                        tsvscode.postMessage({
                            type: "goToDetails",
                            value: cell.getRow().getData(),
                        });
                    },
                },
            ]
        });
    });
</script>

<div bind:this={tableComponent} />
