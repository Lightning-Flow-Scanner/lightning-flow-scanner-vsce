# Lightning Flow Scanner
### _Fix and prevent breaking bugs in Salesforce Lightning Flows with the Lightning Flow Scanner._

## Using the commands

Open the **Command Palette** and type `Flow` to see the list of all available commands or search for the .

### Scan Flows

Flags issues that can lead to bugs or inconsistencies and other potential optimisations in flows.

![All Results Screenshot(https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/scanresults.png)](https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/scanresults.png)

![Filter Results Screenshot(https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/filterresults.png)](https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/filterresults.png)

![Flow Details Screenshot(https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/flowdetails.png)](https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/flowdetails.png)

### Fix Flow

Automatically apply fixes to flows based on (fixable) rules. 

![Fix Flow Screenshot(https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/fixapplied.png)](https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/fixapplied.png)

### Flow Rules

Provides an overview of all rules and their descriptions. 
Current rules from the [core module](https://github.com/Force-Config-Control/lightning-flow-scanner-core) include:
1. DML statements in a loop
1. Duplicate DML operations
1. Hardcoded Ids
1. Missing flow description
1. Missing error handlers
1. Missing null handlers
1. Unconnected elements
1. Unused variables

## Contributing

Lightning Flow Health Check is a free and open source initiative and can benefit hugely from your contribution(s). 
Please consider getting engaged by giving us feedback or leaving a review if you use the extension.
