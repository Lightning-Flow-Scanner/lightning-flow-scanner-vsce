import * as vscode from "vscode";
import { FixFlowsCommand } from "./main/commands/FixFlowsCommand";
import {CreateTestDataCommand} from "./main/commands/CreateTestDataCommand";
import {ScanFlowsCommand} from "./main/commands/ScanFlowsCommand";

export function activate(context: vscode.ExtensionContext) {
  let fixFlowsCommand = new FixFlowsCommand(context);
  let lintFlowsCommand = new ScanFlowsCommand(context);
  let createTestDataCommand = new CreateTestDataCommand(context);

  context.subscriptions.concat([
    vscode.commands.registerCommand('flowhealthcheck.createflowdata', () => createTestDataCommand.execute())
  ]);

  context.subscriptions.concat([
    vscode.commands.registerCommand('flowhealthcheck.fix', () => fixFlowsCommand.execute())
  ]);

  context.subscriptions.concat([
    vscode.commands.registerCommand('flowhealthcheck.scan', () => lintFlowsCommand.execute())
  ]);
}

export function deactivate() {}
