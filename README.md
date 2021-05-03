# Salesforce Flow Control
####_Identify bad practices and potential optimisations in Salesforce Flows._

## Using the commands

Open the **Command Palette** and type `flowlint` to see the list of available commands.

### Lint Flow

Identify:
1. DML statements in a loop
1. Hardcoded ids
1. Missing fault paths
1. Unconnected elements
1. Unused variables

![merge flows demo(https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/LintFlow550660.png)](https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/LintFlow550660.png)

### Fix Flow

Apply fixes automatically for (fixable) rules. Currently supports:
1. Removal of unconnected elements
1. Removal of unused variables

![merge flows demo(https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/FlowReport550660.png)](https://raw.githubusercontent.com/RubenHalman/Force-Flow-Control/master/docs/FlowReport550660.png)