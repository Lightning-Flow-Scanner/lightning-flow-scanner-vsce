# Lightning Flow Health Check
### _Find and Fix potential bugs and optimisations in Salesforce Lightning Flows._

Currently includes rules to flag: 
1. DML statements in a loop
1. Duplicate changes by navigation
1. Hardcoded ids
1. Missing flow description
1. Missing error handlers
1. Missing null handlers
1. Unconnected elements (fixable)
1. Unused variables (fixable)

![Lint Flows Screenshot(https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/selectrules.png)](https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/selectrules.png)

## Using the commands

Open the **Command Palette** and type `flowlint` to see the list of available commands.

### Scan Flows

Flag issues that can lead to bugs or inconsistencies and other potential optimisations in flows.

![Lint Flows Screenshot(https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/scanresults.png)](https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/scanresults.png)

![Flow Report Screenshot(https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/flowresults.png)](https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/flowresults.png)

### Fix Flow

Automatically apply fixes to flows based on (fixable) rules. 

![Fix Results Screenshot(https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/fixresults.png)](https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/fixresults.png)
