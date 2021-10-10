import * as vscode from 'vscode';
import * as child from 'child_process';
import {RunSFDXCommand} from "./RunCommand";
import {SFDX} from "./GetOrgInfo";
import {FlowDefinitionViewResult} from "./GetFlowDefinitionViews";

export interface CoverageResult {
  status: number,
  result: {
    done: boolean,
    totalSize: number,
    records: [{
      type: string,
      url: string,
      Id: string,
      ApexTestClassId: string,
      TestMethodName: string,
      FlowVersionId: string,
      NumElementsCovered: number,
      NumElementsNotCovered: number
    }]
  }
}


export class GetFlowCoverage {

  public async getFlowCoverage(username): Promise<CoverageResult> {

    return await RunSFDXCommand('sfdx force:data:soql:query -q \"SELECT Id, ApexTestClassId, ' +
      'TestMethodName, FlowVersionId, NumElementsCovered, NumElementsNotCovered FROM FlowTestCoverage\"'  + ' -u ' + username + ' -t --json') as Promise<CoverageResult>;
  }
}
