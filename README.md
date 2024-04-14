 [![Lightning Flow Scanner Banner](media/bannerslim.png)](https://github.com/Lightning-Flow-Scanner)

__*Analyze Salesforce Flows for optimization and ensure adherence to Industry Best Practices.*__

 [![Flow Overview](media/overview.jpg)](https://github.com/Lightning-Flow-Scanner/lightning-flow-scanner-vsce)

**Also available as [Salesforce CLI Plugin](https://github.com/Lightning-Flow-Scanner/lightning-flow-scanner-sfdx)*

## Using the commands

Open the **Command Palette** and type `Flow` to see the list of all available commands.

### Scan Flows

Use the `Scan Flows` command by choosing either a directory or a selection of flows to run the analysis on.


*More information on the default rules can be found in the [core  documentation](https://github.com/Lightning-Flow-Scanner/lightning-flow-scanner-core).*

### Configure Scanner

Use the `Configurate Flow Rules` command to configure the rules executed during scanning.

### Fix Flows

Use the `Fix Flows` command to apply available fixes automatically.  

### View Default Flow Rules

The `Default Flow Rules` command can be used to view more details on the rules that are applied to Flows in the scans. 

### Calculate Flow Test Coverage

The `Calculate Flow Coverage` command calculates Flow Test coverage percentages by running the apex tests in your default connectedOrg.

## Settings
 Name        | Description | Type | Default value | 
|--------------|:-----------|--------------|:-----------|
| SpecifyFlows | Specify flow file paths instead of a root directory. | boolean | false | 
| NamingConvention | Specify a REGEX expression to use as Flow Naming convention. | string | [A-Za-z0-9]+_[A-Za-z0-9]+ | 
| APIVersion | Specify an expression to validate the API version, i.e. '===50'(use at least 50). | string | >50 | 
