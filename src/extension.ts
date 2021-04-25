import * as vscode from "vscode";

import { CleanFlowCommand } from "./main/commands/CleanFlowCommand";

export function activate(context: vscode.ExtensionContext) {
  let cleanFlowCommand = new CleanFlowCommand(context);

  context.subscriptions.concat([
    vscode.commands.registerCommand('flowcontrol.clean', () => cleanFlowCommand.execute())
  ]);
}

export function deactivate() {}