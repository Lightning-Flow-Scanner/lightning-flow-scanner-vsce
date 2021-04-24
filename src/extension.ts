import * as vscode from "vscode";

import { RenameFlowCommand } from "./main/commands/RenameFlowCommand";
import { MergeFlowsCommand } from "./main/commands/MergeFlowsCommand";
import { CleanFlowCommand } from "./main/commands/CleanFlowCommand";

export function activate(context: vscode.ExtensionContext) {
  let renameFlowCommand = new RenameFlowCommand(context);
  let mergeFlowsCommand = new MergeFlowsCommand(context);
  let cleanFlowCommand = new CleanFlowCommand(context);

  context.subscriptions.concat([
    vscode.commands.registerCommand('flowcontrol.rename', () => renameFlowCommand.execute()),
    vscode.commands.registerCommand('flowcontrol.merge', () => mergeFlowsCommand.execute()),
    vscode.commands.registerCommand('flowcontrol.clean', () => cleanFlowCommand.execute())
  ]);
}

export function deactivate() {}