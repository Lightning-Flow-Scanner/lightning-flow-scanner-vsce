import * as vscode from 'vscode';
import * as child from 'child_process';

export interface SFDX {
  status: number,
  result: {
    id: string,
    accessToken: string,
    instanceUrl: string,
    username: string,
    clientId: string,
    connectedStatus: string,
    alias: string
  }
}

export class GetOrgInfo {

  public getOrgInfo(): Promise<SFDX> {
    var p = new Promise<SFDX>(resolve => {
      let sfdxCmd ="sfdx force:org:display --json";
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
        let data = JSON.parse(bufferOutData) as SFDX;
        resolve(data);
      });
    });

    return p;
  }
}
