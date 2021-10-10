import * as vscode from 'vscode';
import * as child from 'child_process';

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

  public getFlowCoverage(username): Promise<CoverageResult> {
    var p = new Promise<CoverageResult>(resolve => {
      let sfdxCmd ="sfdx force:data:soql:query -q \"SELECT Id, ApexTestClassId, TestMethodName, " +
        "FlowVersionId, NumElementsCovered, NumElementsNotCovered FROM FlowTestCoverage\""  + " -u " + username +  " -t --json";

      let workspacePath = vscode.workspace.workspaceFolders;
      let foo: child.ChildProcess = child.exec(sfdxCmd,{
        maxBuffer: 1024 * 1024 * 6,
        cwd: workspacePath?workspacePath[0].uri.fsPath:""
      });

      let bufferOutData='';
      foo.stdout.on("data",(dataArg : any)=> {
        bufferOutData+=dataArg;
      });

      foo.stderr.on("data",(data : any)=> {
        vscode.window.showErrorMessage(data);
        resolve();
      });

      foo.stdin.on("data",(data : any)=> {
        vscode.window.showErrorMessage(data);
        resolve();
      });

      foo.on('exit',(code,signal)=>{
        let data = JSON.parse(bufferOutData) as CoverageResult;
        resolve(data);
      });
    });

    return p;
  }
}
