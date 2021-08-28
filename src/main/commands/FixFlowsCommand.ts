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
    const selectedUris: vscode.Uri[] = await new SelectFlows(this.rootPath, 'Select your Flow(s):').execute(this.rootPath);
    if (selectedUris) {
      let results: ScanResult[];
      LintFlowsReport.createOrShow(this.context.extensionUri, results, "Fix");
      const flows: Flow[] = await new ParseFlows().execute(selectedUris);
      results = core.fix(flows);
      for (const flow of flows){
        const result = await new SaveFlow().execute(flow, flow.uri);
      }
      LintFlowsReport.createOrShow(this.context.extensionUri, results, "Fix");
    }
  }
}
