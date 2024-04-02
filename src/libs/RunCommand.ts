import * as vscode from "vscode";
import * as child from "child_process";
import { isWindows } from "./CheckOS";

export function RunSFDXCommand(commandString: string): Promise<any> {

  return new Promise<any>((resolve, reject) => {

    if (isWindows()) {
      commandString = 'cmd /c ' + commandString;
    }

    let workspacePath = vscode.workspace.workspaceFolders;
    let foo: child.ChildProcess = child.exec(commandString, {
      maxBuffer: 1024 * 1024 * 6,
      cwd: workspacePath ? workspacePath[0].uri.fsPath : ""
    });

    let bufferOutData = '';

    foo.stdout.on("data", (dataArg: any) => {
      bufferOutData += dataArg;
    });

    foo.stderr.on("data", (data: any) => {
      // Handle error message
      vscode.window.showErrorMessage(data);
      // Reject the promise with the error message
      reject(new Error(data));
    });

    foo.stdin.on("data", (data: any) => {
      // Handle input data if needed
      vscode.window.showInformationMessage(data);
    });

    foo.on('exit', (code, signal) => {
      if (code === 0) {
        let data = JSON.parse(bufferOutData);
        resolve(data);
      } else {
        // Reject the promise with an error message
        reject(new Error(`Command execution failed with code ${code}.`));
      }
    });
  });
}
