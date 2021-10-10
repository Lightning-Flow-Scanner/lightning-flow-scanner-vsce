
import * as vscode from 'vscode';
import * as child from 'child_process';

export interface FlowDefinitionViewResult {
  status: number,
  result: {
    done: boolean,
    totalSize: number,
    records: [{
      attributes : {
        type: string,
        url: string
      }
      ApiName: string,
      InstalledPackageName: string,
      ActiveVersionId: string,
      Label: string
    }]
  }
}

export class GetFlowDefinitionViews {

  public getFlowDefinitionViews(username): Promise<FlowDefinitionViewResult> {
    var p = new Promise<FlowDefinitionViewResult>(resolve => {
      let sfdxCmd ="sfdx force:data:soql:query -q \"SELECT ApiName, InstalledPackageName, ActiveVersionId, Label FROM FlowDefinitionView WHERE IsActive =true\"" + " -u " + username +  " --json";
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
        let data = JSON.parse(bufferOutData) as FlowDefinitionViewResult;
        resolve(data);
      });
    });

    return p;
  }
}
