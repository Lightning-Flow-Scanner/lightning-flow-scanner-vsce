# Run Automated Jobs on Salesforce Flow(s) using Visual Studio Code

## Introduction

**Force Flow Control** 
*Aims to assist you when you work with Salesforce Flows(force.com platform automation tools) using the Visual Studio Code Editor,
offering you automated jobs for otherwise time consuming tasks, ie: merging or renaming flows.*

*We recommend you combine this tool with SFDX, but it is not a prerequisite for local use.*

## Using the commands

Open the **Command Palette** and type `flow` to see the list of available commands.

### Clean Flow

Remove unused elements and variables from a Flow.

![merge flows demo(https://raw.githubusercontent.com/Force-Config-Control/Salesforce-Flow-Control/master/docs/demomerge.gif)](https://raw.githubusercontent.com/Force-Config-Control/Salesforce-Flow-Control/master/docs/democlean.gif)

### Merge Flows

Merge two Flows:

![merge flows demo(https://raw.githubusercontent.com/Force-Config-Control/Salesforce-Flow-Control/master/docs/demomerge.gif)](https://raw.githubusercontent.com/Force-Config-Control/Salesforce-Flow-Control/master/docs/demomerge.gif)

### Rename Flow

Rename a Flow:

![rename a flow demo(https://raw.githubusercontent.com/Force-Config-Control/Salesforce-Flow-Control/master/docs/demorename.gif)](https://raw.githubusercontent.com/Force-Config-Control/Salesforce-Flow-Control/master/docs/demorename.gif)


https://help.salesforce.com/articleView?id=sf.flow_prep_bestpractices.htm&type=5

Never hard-code Salesforce IDs.
    IDs are org-specific, so don’t hard-code new or existing IDs. Instead, let Salesforce create the IDs, and pass them into variables when the flow starts. You can do so, for example, by using merge fields in URL parameters or by using a Get Records element. 
    
    