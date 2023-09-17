<script lang="typescript">
    import { TabulatorFull as Tabulator } from "tabulator-tables";
    import { onMount } from "svelte";

    export let allResults;
    let tableComponent;

    onMount(() => {
        new Tabulator(tableComponent, {
            data: allResults,
            reactiveData: true,
            layout: "fitColumns",
            groupBy: ["ruleLabel"],
            groupHeader: function (value, count, data, group) {
                if (data && data.length > 0) {
                    return (
                        value +
                        "<span>(" +
                        count +
                        " total)</span>" +
                        "<p style='font-style: italic'>" +
                            data[0].ruleDescription +
                        "</p>"
                    );
                } else {
                    return (
                        value +
                        "<span style='color:#d00; margin-left:10px;'>(" +
                        count +
                        " total)</span>"
                    );
                }
            },
            columns: [
                { 
                    title: "#", 
                    formatter: "rownum", 
                    width: 75
                },
                {
                    title: "Name",
                    field: "name",
                    formatter: "textarea",
                },
                {
                    title: "Type",
                    field: "type",
                    formatter: "plaintext",
                    width: 150,
                },
                {
                    title: "DataType",
                    field: "dataType",
                    width: 150,
                    formatter: "textarea"
                },
                {
                    title: "X coordinates",
                    field: "locationX",
                    width: 75,
                },
                {
                    title: "Y coordinates",
                    field: "locationY",
                    width: 75,
                },
                {
                    title: "Connects to",
                    field: "connectsTo",
                    formatter: "textarea",
                },
                {
                    title: "Expression",
                    field: "expression",
                    formatter: "textarea",
                },
            ],
        });
    });
</script>

<div bind:this={tableComponent} />