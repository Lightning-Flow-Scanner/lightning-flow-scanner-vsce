# Lightning Flow Scanner
### _Fix and Prevent bugs in the Lightning Flows of your Salesforce Org._

![Scan Demo(https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/demo.gif)](https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/demo.gif)

## Using the commands

Open the **Command Palette** and type `Flow` to see the list of all available commands.

### Scan Flows

Use the scan command to flags issues that can lead to bugs or issues in flows.

![All Results Screenshot(https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/scanresults.png)](https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/scanresults.png)

![Filter Results Screenshot(https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/filterresults.png)](https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/filterresults.png)

![Flow Details Screenshot(https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/flowdetails.png)](https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/flowdetails.png)

### Fix Flow

Use the fix command to apply automatic fixes to flows. 

![Fix Flow Screenshot(https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/fixapplied.png)](https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/fixapplied.png)

### Flow Rules

Provides an overview of all available rules. Current rules include:
1. DML statements in a loop
1. Duplicate DML operations
1. Hardcoded Ids
1. Missing flow description
1. Missing error handlers
1. Missing null handlers
1. Unconnected elements
1. Unused variables

[See the core module for further details](https://github.com/Force-Config-Control/lightning-flow-scanner-core)

## Contributing

The Lightning Flow Scanner is a free and open source initiative and can benefit hugely from your contribution(s). 
Please consider getting engaged by giving us feedback or leaving a review if you use the extension.

#### _Now also available as [SFDX Plugin(Beta)](https://github.com/Force-Config-Control/lightning-flow-scanner-core)!_
