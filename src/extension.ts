import * as vscode from "vscode";

import { RenameFlowCommand } from "./main/commands/RenameFlowCommand";
import { MergeFlowsCommand } from "./main/commands/MergeFlowsCommand";

export function activate(context: vscode.ExtensionContext) {
  let renameFlowCommand = new RenameFlowCommand();
  let mergeFlowsCommand = new MergeFlowsCommand();

  context.subscriptions.concat([
    vscode.commands.registerCommand('flowcontrol.rename', () => renameFlowCommand.execute(),
    vscode.commands.registerCommand('flowcontrol.merge', () => mergeFlowsCommand.execute())
    )
  ]);
}

export function deactivate() {}