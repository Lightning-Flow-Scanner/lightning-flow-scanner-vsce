  <script>
    import TailwindWrapper from './commons/TailwindWrapper.svelte';
    import Banner from './Banner.svelte'

    function viewRules() {
      tsvscode.postMessage({
            type: "viewRules"
        });
    }

    function scanFlows() {
      tsvscode.postMessage({
            type: "scanFlows"
        });
    }

    function runTests() {
      tsvscode.postMessage({
            type: "runTests"
        });
    }

    function fixFlows() {
      tsvscode.postMessage({
            type: "fixFlows"
        });
    }

    function configRules() {
      tsvscode.postMessage({
            type: "configRules"
        });
    }

  </script>

  <TailwindWrapper>
    <div class="sb">
    <Banner/>
      <nav aria-label="Sidebar">
        <button class="btn btn-blue" on:click={configRules}>
          Configure Rules
        </button>
        <button class="btn btn-blue" on:click={scanFlows}>
          Scan Flows
        </button>
        <button class="btn btn-blue" on:click={runTests}>
          Calc Coverage %
        </button>
        <button class="btn btn-blue" on:click={fixFlows}>
          Fix Flows
        </button>
        <button class="btn btn-blue" on:click={viewRules}>
          Documentation
        </button>
      </nav>
      <div>
        <p>Support our mission to champion Best Practices by starring ⭐ us on <a href="https://github.com/Lightning-Flow-Scanner/lightning-flow-scanner-vsce">GitHub</a></p>
      </div>
    </div>

  </TailwindWrapper>


  <style>

    .sb{
      @apply flex flex-col;
    }

    p{
      @apply italic mt-auto;
    }

    .btn {
      @apply font-bold py-2 my-2 px-4 rounded;
    }
    .btn-blue {
      @apply bg-blue-500 text-white;
    }
    .btn-blue:hover {
      @apply bg-blue-700;
    }
  </style>