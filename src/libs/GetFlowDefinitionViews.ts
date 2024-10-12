import * as vscode from 'vscode';
import * as child from 'child_process';
import { RunSFDXCommand } from './RunCommand';
import { SFDX } from './GetOrgInfo';

export interface FlowDefinitionViewResult {
  status: number;
  result: {
    done: boolean;
    totalSize: number;
    records: [
      {
        attributes: {
          type: string;
          url: string;
        };
        ApiName: string;
        InstalledPackageName: string;
        ActiveVersionId: string;
        Label: string;
      }
    ];
  };
}

export class GetFlowDefinitionViews {
  public async getFlowDefinitionViews(
    username
  ): Promise<FlowDefinitionViewResult> {
    return (await RunSFDXCommand(
      'sf data query --query "SELECT ApiName, InstalledPackageName, ' +
        'ActiveVersionId, Label FROM FlowDefinitionView WHERE IsActive =true"' +
        ' -o ' +
        username +
        ' --json'
    )) as Promise<FlowDefinitionViewResult>;
  }
}
