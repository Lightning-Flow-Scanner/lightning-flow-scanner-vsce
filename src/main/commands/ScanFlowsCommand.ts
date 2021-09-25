import {BaseCommand} from "./BaseCommand";
import * as vscode from "vscode";
import {SelectFlows} from "../libs/SelectFlows";
import {ParseFlows} from "../libs/ParseFlows";
import {LintFlowsReport} from "../panels/LintFlowsReport";
import * as core from 'lightning-flow-scanner-core/out';
import {Flow} from "lightning-flow-scanner-core/out/main/models/Flow";
import {ScanResult} from "lightning-flow-scanner-core/out/main/models/ScanResult";

export class ScanFlowsCommand extends BaseCommand {

  constructor(context: vscode.ExtensionContext
  ) {
    super(context)
  }

  public async execute() {
    const selectedUris: vscode.Uri[] = await new SelectFlows(this.rootPath, 'Select a root folder:').execute(this.rootPath);
    if (selectedUris.length > 0) {
      const flows: Flow[] = await new ParseFlows().execute(selectedUris);
      const results: ScanResult[] = core.scan(flows);
      LintFlowsReport.createOrShow(this.context.extensionUri, results, "Scan");
    } else {
      vscode.window.showInformationMessage('No flow files found.');
    }

  }
}
