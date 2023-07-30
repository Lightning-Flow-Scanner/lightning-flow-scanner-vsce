{#if nr === 1}
    <thead>
    <tr>
        <th colspan=1 style="width: 10%">#</th>
        <th colspan=1 style="width: 40%">name</th>
        <th colspan=1 style="width: 40%">type</th>
        <th colspan=1 style="width: 10%">details</th>
    </tr>
    </thead>
  {/if}
<tr>
    <td style="width: 10%">{nr}</td>
    <td style="width: 40%">{result.name}</td>
    <td style="width: 40%; text-transform: capitalize;">{result.subtype}</td>
    <td style="width: 10%; text-transform: capitalize;">
        <button on:click={() => updateShowDetails()}>show</button>
    </td>
</tr>
{#if showDetails}
  {#if result.element}
      <tr>
          <td colspan=3>
              <div class="detailtable">
                  <table style="width: 100%;">
                    {#if result.element["locationX"] && result.element["locationY"]}
                        <tr>
                            <td style="width: 50%;">Coordinates</td>
                            <td style="width: 50%;">X: {result.element["locationX"]}
                                Y: {result.element["locationY"]}</td>
                        </tr>
                    {/if}
                    {#if result.element["connector"]}
                        <tr>
                            <td style="width: 50%;">Next node</td>
                            <td style="width: 50%;">{result.element["connector"][0]["targetReference"][0]}</td>
                        </tr>
                    {/if}
                  </table>
              </div>
          </td>
      </tr>
  {/if}
{/if}

<script>
    export let result;
    export let nr = 0;
    let showDetails = false;
    function updateShowDetails() {
        showDetails = !showDetails;
    }

</script>
