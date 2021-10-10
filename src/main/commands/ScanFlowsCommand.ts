import {BaseCommand} from "./BaseCommand";
import * as vscode from "vscode";
import {SelectFlows} from "../libs/SelectFlows";
import {ParseFlows} from "../libs/ParseFlows";
import {GetOrgInfo} from "../libs/GetOrgInfo";
import {LintFlowsReport} from "../panels/LintFlowsReport";
import * as core from 'lightning-flow-scanner-core/out';
import {Flow} from "lightning-flow-scanner-core/out/main/models/Flow";
import {ScanResult} from "lightning-flow-scanner-core/out/main/models/ScanResult";
import {GetFlowCoverage} from "../libs/GetFlowCoverage";
import {GetFlowDefinitionViews} from "../libs/GetFlowDefinitionViews";



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

      // todo new class
      const orgInfo = await new GetOrgInfo().getOrgInfo();
      if(orgInfo.result && orgInfo.result.username){
        const flowCoverage = await new GetFlowCoverage().getFlowCoverage(orgInfo.result.username);
        const flowDefinitions = await new GetFlowDefinitionViews().getFlowDefinitionViews(orgInfo.result.username);
        for (let scanResult of results){
          const matchingFlowDefinition = flowDefinitions.result.records.find((record) => scanResult.flow.label[0] === record.Label);
          scanResult['matchingFlowDefinition'] = matchingFlowDefinition;
          const matchingFlowCoverage = flowCoverage.result.records.find(record => matchingFlowDefinition.ActiveVersionId === record.FlowVersionId);
          if(matchingFlowCoverage){
              scanResult['coverage'] = matchingFlowCoverage.NumElementsCovered / (matchingFlowCoverage.NumElementsCovered + matchingFlowCoverage.NumElementsNotCovered) * 100;
          }
        }
      }

      LintFlowsReport.createOrShow(this.context.extensionUri, results, "Scan");
    } else {
      vscode.window.showInformationMessage('No flow files found.');
    }

  }
}
