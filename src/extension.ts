import * as vscode from "vscode";
import mainwithloosenodes = require("./test/suite/testfiles/mainwithloosenodes.json");
import assignHardcodedId = require("./test/suite/testfiles/assignHardcodedId.json");
import mainExample = require("./test/suite/testfiles/main-example.json");
import secondary = require("./test/suite/testfiles/secondary-example.json");
import unusedVars = require("./test/suite/testfiles/unusedVariables.json");
import { CleanFlowCommand } from "./main/commands/CleanFlowCommand";
import Flow = require("./main/models/Flow");
import {CreateTestDataCommand} from "./main/commands/CreateTestDataCommand";
import {LintFlowsCommand} from "./main/commands/LintFlowsCommand";
import { LintFlowsReport } from "./main/panels/LintFlowsReport";
import {ScanFlows} from "./main/libs/ScanFlows";
import {FindFlowMetadata} from "./main/libs/FindFlowMetadata";
import {FindUnusedVariables} from "./main/rules/FindUnusedVariables";
import {FindHardcodedIds} from "./main/rules/FindHardcodedIds";
import {BuildNewFlow} from "./main/libs/BuildNewFlow";
import {FindUnusedElements} from "./main/rules/FindUnusedElements";
import {FlowReport} from "./main/panels/FlowReport";

export function activate(context: vscode.ExtensionContext) {
  let cleanFlowCommand = new CleanFlowCommand(context);
  let lintFlowsCommand = new LintFlowsCommand(context);
  let createTestDataCommand = new CreateTestDataCommand(context);

  context.subscriptions.concat([
    vscode.commands.registerCommand('flowcontrol.clean', () => cleanFlowCommand.execute())
  ]);

  context.subscriptions.concat([
    vscode.commands.registerCommand('flowcontrol.create', () => createTestDataCommand.execute())
  ]);

  context.subscriptions.concat([
    vscode.commands.registerCommand('flowcontrol.lint', () => lintFlowsCommand.execute())
  ]);

  context.subscriptions.concat([
    vscode.commands.registerCommand('flowcontrol.refresh', () => {
      const selectedFlow1 = new Flow({
        label: 'mainExample',
        uri: {fsPath: '/Users/rhalman001/IdeaProjects/Salesforce-Flow-Control/src/test/suite/testfiles/assignHardcodedId.json'},
        xmldata : mainExample,
      });
      const selectedFlow2 = new Flow({
        label: 'mainwithloosenodes',
        uri: {fsPath: '/Users/rhalman001/IdeaProjects/Salesforce-Flow-Control/src/test/suite/testfiles/main-add-vars-example.json'},
        xmldata : mainwithloosenodes,
      });
      const selectedFlow3 = new Flow({
        label: 'secondary',
        uri: {fsPath: '/Users/rhalman001/IdeaProjects/Salesforce-Flow-Control/src/test/suite/testfiles/assignHardcodedId.json'},
        xmldata : secondary,
      });
      const selectedFlow4 = new Flow({
        label: 'assignHardcodedId',
        uri: {fsPath: '/Users/rhalman001/IdeaProjects/Salesforce-Flow-Control/src/test/suite/testfiles/assignHardcodedId.json'},
        xmldata : assignHardcodedId
      });
      const selectedFlow5 = new Flow({
        label: 'unusedVars',
        uri: {fsPath: '/Users/rhalman001/IdeaProjects/Salesforce-Flow-Control/src/test/suite/testfiles/assignHardcodedId.json'},
        xmldata : unusedVars,
      });

      const flows = [
        selectedFlow1,
        selectedFlow2,
        selectedFlow3,
        selectedFlow4,
        selectedFlow5
      ];
      new ScanFlows().execute(flows);
      LintFlowsReport.createOrShow(context.extensionUri, flows);

      // new FindFlowMetadata().execute(selectedFlow1);
      // new FindUnusedVariables().execute(selectedFlow1);
      // new FindUnusedElements().execute(selectedFlow1);
      // new FindHardcodedIds().execute(selectedFlow1);
      // new BuildNewFlow().execute(selectedFlow1);
      // FlowReport.kill();
      // FlowReport.create(context.extensionUri, selectedFlow1);
    })
  ]);
}

export function deactivate() {}