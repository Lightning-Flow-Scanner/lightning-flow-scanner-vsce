import {BaseCommand} from "./BaseCommand";
import * as vscode from "vscode";
import {SelectFlows} from "../libs/SelectFlows";
import {ParseFlows} from "../libs/ParseFlows";
import {LintFlowsReport} from "../panels/LintFlowsReport";
import * as core from 'lightningflowscan-core/out';
import {Flow} from "lightningflowscan-core/out/main/models/Flow";
import {ScanResult} from "lightningflowscan-core/out/main/models/ScanResult";

export class ScanFlowsCommand extends BaseCommand {

  constructor(context: vscode.ExtensionContext
  ) {
    super(context)
  }

  public async execute() {

    const selectedUris: vscode.Uri[] = await new SelectFlows(this.rootPath, 'Select your Flow(s):').execute(this.rootPath);
    if (selectedUris) {
      const flows: Flow[] = await new ParseFlows().execute(selectedUris);
      const results: ScanResult[] = core.Scan(flows);
      LintFlowsReport.createOrShow(this.context.extensionUri, results);
    }
  }

}
