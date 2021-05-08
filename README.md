# Lightning Flow Health Check
### _Find and Fix potential bugs and optimisations in Salesforce Lightning Flows._

Currently includes rules to flag: 
1. DML statements in a loop
1. Duplicate changes by navigation
1. Hardcoded ids
1. Missing error handler
1. Unconnected elements (fixable)
1. Unused variables (fixable)

## Using the commands

Open the **Command Palette** and type `flowlint` to see the list of available commands.

### Scan Flows

Flag issues that can lead to bugs or inconsistencies and other potential optimisations in flows.

![Lint Flows Screenshot(https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/LintFlowResults13501000.png)](https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/LintFlowResults13501000.png)

![Flow Report Screenshot(https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/FlowResultDetails13501000.png)](https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/FlowResultDetails13501000.png)

### Fix Flow

Automatically apply fixes to flows based on (fixable) rules. 

![Fix Results Screenshot(https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/FixResults1350700.png)](https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/FixResults1350700.png)
