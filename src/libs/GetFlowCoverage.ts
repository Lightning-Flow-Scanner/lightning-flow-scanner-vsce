import { RunSFDXCommand } from './RunCommand';

export interface CoverageResult {
  status: number;
  result: {
    done: boolean;
    totalSize: number;
    records: [
      {
        type: string;
        url: string;
        Id: string;
        ApexTestClassId: string;
        TestMethodName: string;
        FlowVersionId: string;
        NumElementsCovered: number;
        NumElementsNotCovered: number;
      }
    ];
  };
}

export class GetFlowCoverage {
  public async getFlowCoverage(username): Promise<CoverageResult> {
    return (await RunSFDXCommand(
      'sf data query --query "SELECT Id, ApexTestClassId, ' +
        'TestMethodName, FlowVersionId, NumElementsCovered, NumElementsNotCovered FROM FlowTestCoverage"' +
        ' -o ' +
        username +
        ' -t --json'
    )) as Promise<CoverageResult>;
  }
}
