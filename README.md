[![Lightning Flow Scanner Banner](docs/banner.png)](https://github.com/Lightning-Flow-Scanner)

__*Identify potential issues and improvements in Salesforce Flows*__



<!-- [![Demo Image Overview](docs/overview.png)](https://github.com/Lightning-Flow-Scanner/lightning-flow-scanner-vsce)

[![Demo Image Details](docs/details.png)](https://github.com/Lightning-Flow-Scanner/lightning-flow-scanner-vsce) -->

**Also available as [SFDX Plugin](https://github.com/Lightning-Flow-Scanner/lightning-flow-scanner-sfdx)*

## Using the commands

Open the **Command Palette** and type `Flow` to see the list of all available commands.

### Scan Flows

Use the `Scan Flows` command by choosing either a directory or a selection of flows to run the analysis on.

### Fix Flows

Use the `Fix Flows` command to apply available fixes automatically.  

### View Default Flow Rules

The `View Default Flow Rules` command can be used to view more details on the rules that are applied to Flows in the scans. 

## Rule Overview

| Rule       | Description |
|--------------|:-----------|
| **Outdated API Version** | Introducing newer API components may lead to unexpected issues with older versions of Flows, as they might not align with the underlying mechanics. Starting from API version 50.0, the 'Api Version' attribute has been readily available on the Flow Object. To ensure smooth operation and reduce discrepancies between API versions, it is strongly advised to regularly update and maintain them. |
| **Copy API Name** | Maintaining multiple elements with a similar name, like 'Copy_X_Of_Element,' can diminish the overall readability of your Flow. When copying and pasting these elements, it's crucial to remember to update the API name of the newly created copy. |
| **DML Statement In A Loop** |  To prevent exceeding Apex governor limits, it is advisable to consolidate all your record-related operations, including creation, updates, or deletions, at the conclusion of the flow. |
| **Duplicate DML Operation** |   When the flow executes database changes or actions between two screens, it's important to prevent users from navigating back between screens. Failure to do so may result in duplicate database operations being performed within the flow. |
| **Hardcoded Id** |  Avoid hard-coding IDs as they are org-specific. Instead, pass them into variables at the start of the flow. You can achieve this by utilizing merge fields in URL parameters or employing a Get Records element. |
| **Flow Naming Convention** |  The readability of a flow is of utmost importance. Establishing a naming convention for the Flow Name significantly enhances findability, searchability, and maintains overall consistency. It is advisable to include at least a domain and a brief description of the actions carried out in the flow, for instance, 'Service_OrderFulfillment'. |
| **Missing Flow Description** |   Descriptions play a vital role in documentation. We highly recommend including details about where they are used and their intended purpose. |
| **Missing Fault Path** |  At times, a flow may fail to execute a configured operation as intended. By default, the flow displays an error message to the user and notifies the admin who created the flow via email. However, you can customize this behavior by incorporating a Fault Path. |
| **Missing Null Handler**      |   When a Get Records operation doesn't find any data, it returns null. To ensure data validation, utilize a decision element on the operation result variable to check for a non-null result. |
| **Unconnected Element** |  Unconnected elements which are not being used by the Flow should be avoided to keep Flows efficient and maintainable. |
| **Unused Variable**      |  To maintain the efficiency and manageability of your Flow, it's advisable to avoid including unconnected variables that are not in use. |

**More information on the rules can be found in the [lfs-core module documentation](https://github.com/Lightning-Flow-Scanner/lightning-flow-scanner-core).*

## Settings
 Name        | Description | Type | Default value | 
|--------------|:-----------|--------------|:-----------|
| SpecifyFlows | Specify flow file paths instead of a root directory. | boolean | false | 
| NamingConvention | Specify a REGEX expression to use as Flow Naming convention. | string | [A-Za-z0-9]+_[A-Za-z0-9]+ | 
| APIVersion | Specify an expression to validate the API version, i.e. '===50'(use at least 50). | string | >50 | 
