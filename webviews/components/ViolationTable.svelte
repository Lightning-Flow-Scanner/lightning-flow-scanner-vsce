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
                let description;
                if (data && data.length > 0) {
                    description = data[0].ruleDescription;
                    return (
                        value +
                        "<span>(" +
                        count +
                        " item)</span>" +
                        "<p style='font-style: italic'>" +
                        description +
                        "</p>"
                    );
                } else {
                    return (
                        value +
                        "<span style='color:#d00; margin-left:10px;'>(" +
                        count +
                        " item)</span>"
                    );
                }
            },
            columns: [
                { title: "#", formatter: "rownum", width: 75 },
                {
                    title: "Violation",
                    field: "violation",
                    formatter: "textarea",
                },
                {
                    title: "Type",
                    field: "type",
                    formatter: "plaintext",
                    width: 150,
                },
                {
                    title: "X coordinates",
                    field: "xCoordinates",
                    width: 75,
                },
                {
                    title: "Y coordinates",
                    field: "yCoordinates",
                    width: 75,
                },
                {
                    title: "Connects to",
                    field: "connectsto",
                    formatter: "textarea",
                },
            ],
        });
    });
</script>

<div bind:this={tableComponent} />