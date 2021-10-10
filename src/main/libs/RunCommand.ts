import * as vscode from "vscode";
import * as child from "child_process";
import {isWindows} from "./CheckOS";

export function RunSFDXCommand(commandString : string): Promise<any> {

  return new Promise<any>(resolve => {

    if(isWindows()){
      commandString = 'cmd /c ' + commandString;
    }

    let workspacePath = vscode.workspace.workspaceFolders;
    let foo: child.ChildProcess = child.exec(commandString,{
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
      let data = JSON.parse(bufferOutData);
      resolve(data);
    });


  });
}
