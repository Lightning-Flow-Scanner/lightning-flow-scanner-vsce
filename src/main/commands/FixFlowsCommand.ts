import * as vscode from "vscode";
import {BaseCommand} from "./BaseCommand";
import {SaveFlow} from "../libs/SaveFlow";
import {Flow} from "lightning-flow-scanner-core/out/main/models/Flow";
import {SelectFlows} from "../libs/SelectFlows";
import {ParseFlows} from "../libs/ParseFlows";
import * as core from "lightning-flow-scanner-core/out";
import {ScanResult} from "lightning-flow-scanner-core/out/main/models/ScanResult";
import {LintFlowsReport} from "../panels/LintFlowsReport";

export class FixFlowsCommand extends BaseCommand {

  constructor(context: vscode.ExtensionContext
  ) {
    super(context)
  }

  public async execute() {
    const selectedUris: vscode.Uri[] = await new SelectFlows(this.rootPath, 'Select a project that includes Flow(s):').execute(this.rootPath);
    if (selectedUris) {
      const flows: Flow[] = await new ParseFlows().execute(selectedUris);
      const results: ScanResult[] = core.fix(flows);
      for (const result of results){
        if(
          result.ruleResults.find(res => res.ruleName === "UnusedVariables").occurs ||
          result.ruleResults.find(res => res.ruleName === "UnconnectedElements").occurs)
        {
          let saved = await new SaveFlow().execute(result.flow, result.flow.uri);
        }
      }
      LintFlowsReport.createOrShow(this.context.extensionUri, results, "Fix");
    }
  }
}
