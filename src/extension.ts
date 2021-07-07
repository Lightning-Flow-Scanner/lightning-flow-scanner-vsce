import * as vscode from "vscode";
import { FixFlowsCommand } from "./main/commands/FixFlowsCommand";
import {CreateTestDataCommand} from "./main/commands/CreateTestDataCommand";
import {ScanFlowsCommand} from "./main/commands/ScanFlowsCommand";
import {ViewFlowRulesCommand} from "./main/commands/ViewFlowRulesCommand";

export function activate(context: vscode.ExtensionContext) {
  let fixFlowsCommand = new FixFlowsCommand(context);
  let lintFlowsCommand = new ScanFlowsCommand(context);
  let createTestDataCommand = new CreateTestDataCommand(context);
  let viewRulesCommand = new ViewFlowRulesCommand(context);

  context.subscriptions.concat([
    vscode.commands.registerCommand('lightningflowscan.createflowdata', () => createTestDataCommand.execute())
  ]);

  context.subscriptions.concat([
    vscode.commands.registerCommand('lightningflowscan.fix', () => fixFlowsCommand.execute())
  ]);

  context.subscriptions.concat([
    vscode.commands.registerCommand('lightningflowscan.scan', () => lintFlowsCommand.execute())
  ]);

  context.subscriptions.concat([
    vscode.commands.registerCommand('lightningflowscan.viewrules', () => viewRulesCommand.execute())
  ]);
}

export function deactivate() {}
