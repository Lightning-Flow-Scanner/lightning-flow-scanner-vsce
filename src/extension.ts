import * as vscode from "vscode";
import mainwithloosenodes = require("./test/suite/testfiles/mainwithloosenodes.json");
import assignHardcodedId = require("./test/suite/testfiles/assignHardcodedId.json");
import { CleanFlowCommand } from "./main/commands/CleanFlowCommand";
import {FindFlowMetadata} from "./main/libs/FindFlowMetadata";
import {FindUnusedVariables} from "./main/rules/FindUnusedVariables";
import {FindUnusedElements} from "./main/rules/FindUnusedElements";
import {BuildNewFlow} from "./main/libs/BuildNewFlow";
import {Report} from "./main/panels/Report";
import Flow = require("./main/models/Flow");
import {CreateTestDataCommand} from "./main/commands/CreateTestDataCommand";
import {LintReport} from "./main/panels/LintReport";
import {FindHardcodedIds} from "./main/rules/FindHardcodedIds";
import {LintFlowCommand} from "./main/commands/LintFlowCommand";

export function activate(context: vscode.ExtensionContext) {
  let cleanFlowCommand = new CleanFlowCommand(context);
  let lintFlowCommand = new LintFlowCommand(context);
  let createTestDataCommand = new CreateTestDataCommand(context);

  context.subscriptions.concat([
    vscode.commands.registerCommand('flowcontrol.clean', () => cleanFlowCommand.execute())
  ]);

  context.subscriptions.concat([
    vscode.commands.registerCommand('flowcontrol.create', () => createTestDataCommand.execute())
  ]);

  context.subscriptions.concat([
    vscode.commands.registerCommand('flowcontrol.lint', () => lintFlowCommand.execute())
  ]);

  context.subscriptions.concat([
    vscode.commands.registerCommand('flowcontrol.refresh', () => {
      const selectedFlow = new Flow({
        label: 'main',
        path: 'anypath',
        xmldata : assignHardcodedId,
        detail: 'anypath'
      });
      new FindFlowMetadata().execute(selectedFlow);
      new FindUnusedVariables().execute(selectedFlow);
      new FindUnusedElements().execute(selectedFlow);
      new FindHardcodedIds().execute(selectedFlow);
      new BuildNewFlow().execute(selectedFlow);

      LintReport.kill();
      LintReport.createOrShow(context.extensionUri, selectedFlow);
    })
  ]);
}

export function deactivate() {}