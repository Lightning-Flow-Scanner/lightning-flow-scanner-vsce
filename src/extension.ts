import * as vscode from "vscode";
import mainwithloosenodes = require("./test/suite/testfiles/mainwithloosenodes.json");
import assignHardcodedId = require("./test/suite/testfiles/assignHardcodedId.json");
import mainExample = require("./test/suite/testfiles/main-example.json");
import secondary = require("./test/suite/testfiles/secondary-example.json");
import unusedVars = require("./test/suite/testfiles/unusedVariables.json");
import dmlsInALoop = require("./test/suite/testfiles/allDMLStatementsInALoop.json");
import { FixFlowCommand } from "./main/commands/FixFlowCommand";
import Flow = require("./main/models/Flow");
import {CreateTestDataCommand} from "./main/commands/CreateTestDataCommand";
import {LintFlowsCommand} from "./main/commands/LintFlowsCommand";
import { LintFlowsReport } from "./main/panels/LintFlowsReport";
import {ScanFlows} from "./main/libs/ScanFlows";
import {UnusedVariables} from "./main/rules/UnusedVariables";
import {HardcodedIds} from "./main/rules/HardcodedIds";
import {BuildNewFlow} from "./main/libs/BuildNewFlow";
import {UnconnectedElements} from "./main/rules/UnconnectedElements";
import {FlowReport} from "./main/panels/FlowReport";
import {SelectRules} from "./main/panels/SelectRules";

export function activate(context: vscode.ExtensionContext) {
  let fixFlowCommand = new FixFlowCommand(context);
  let lintFlowsCommand = new LintFlowsCommand(context);
  let createTestDataCommand = new CreateTestDataCommand(context);

  context.subscriptions.concat([
    vscode.commands.registerCommand('flowlint.fix', () => fixFlowCommand.execute())
  ]);

  context.subscriptions.concat([
    vscode.commands.registerCommand('flowlint.createflowdata', () => createTestDataCommand.execute())
  ]);

  context.subscriptions.concat([
    vscode.commands.registerCommand('flowlint.lint', () => lintFlowsCommand.execute())
  ]);

}

export function deactivate() {}