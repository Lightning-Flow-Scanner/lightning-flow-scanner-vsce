# Salesforce Flow Control
### _Identify bad practices and potential optimisations in Salesforce Flows._

Currently comes with the following rules included: 
1. DML statements in a loop
1. Hardcoded ids
1. Missing fault paths
1. Unconnected elements (fixable)
1. Unused variables (fixable)

## Using the commands

Open the **Command Palette** and type `flowlint` to see the list of available commands.

### Lint Flow

Use static analysis to flag issues that can lead to bugs or inconsistencies.

![merge flows demo(https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/LintFlowResults13501000.png)](https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/LintFlow550660.png)

![merge flows demo(https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/FlowResultDetails13501000.png)](https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/FlowReport550660.png)

### Fix Flow

Apply fixes to flows automatically based on (fixable) rules. 

![merge flows demo(https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/FixResults1350700.png)](https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/FlowReport550660.png)
