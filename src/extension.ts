import * as vscode from "vscode";
import { FixFlowsCommand } from "./main/commands/FixFlowsCommand";
import {CreateTestDataCommand} from "./main/commands/CreateTestDataCommand";
import {ScanFlowsCommand} from "./main/commands/ScanFlowsCommand";
import {ViewFlowRulesCommand} from "./main/commands/ViewFlowRulesCommand";
import { ScanOverview } from "./main/panels/ScanOverview";
import { RuleOverview } from "./main/panels/RuleOverview";
import { ViolationOverview } from "./main/panels/ViolationOverview";
import ScanResult from "lightning-flow-scanner-core/out/main/models/ScanResult";

export function activate(context: vscode.ExtensionContext) {
  let fixFlowsCommand = new FixFlowsCommand(context);
  let lintFlowsCommand = new ScanFlowsCommand(context);
  let createTestDataCommand = new CreateTestDataCommand(context);
  let viewRulesCommand = new ViewFlowRulesCommand(context);

  context.subscriptions.concat([
    vscode.commands.registerCommand('lightningflowscanner.parse', () => createTestDataCommand.execute())
  ]); 

  context.subscriptions.concat([
    vscode.commands.registerCommand('lightningflowscanner.fix', () => fixFlowsCommand.execute())
  ]);

  context.subscriptions.concat([
    vscode.commands.registerCommand('lightningflowscanner.scan', () => lintFlowsCommand.execute())
  ]);

  context.subscriptions.concat([
    vscode.commands.registerCommand('lightningflowscanner.viewrules', () => viewRulesCommand.execute())
  ]);

  context.subscriptions.concat([
    vscode.commands.registerCommand('lightningflowscanner.debug', () => {
      
      // RuleOverview.kill();
      // RuleOverview.createOrShow(context.extensionUri);
      // ScanOverview.kill();
      // ScanOverview.createOrShow(context.extensionUri, data as [], "Scan");
      // ViolationOverview.kill();
      // ViolationOverview.create(context.extensionUri,  singleresult as unknown as ScanResult);
      setTimeout(() => {
        vscode.commands.executeCommand("workbench.action.webview.openDeveloperTools");
      }, 500);
    })
  ]);
}

export function deactivate() {}