import * as vscode from 'vscode';
import * as child from 'child_process';
import { isWindows } from './CheckOS';

export function RunSFDXCommand(commandString: string): Promise<unknown> {
  return new Promise<unknown>((resolve, reject) => {
    if (isWindows()) {
      commandString = 'cmd /c ' + commandString;
    }

    const workspacePath = vscode.workspace.workspaceFolders;
    const foo: child.ChildProcess = child.exec(commandString, {
      maxBuffer: 1024 * 1024 * 6,
      cwd: workspacePath ? workspacePath[0].uri.fsPath : '',
    });

    let bufferOutData = '';

    foo.stdout.on('data', (dataArg: string) => {
      bufferOutData += dataArg;
    });

    foo.stderr.on('data', (data: string) => {
      // Handle error message
      vscode.window.showErrorMessage(data);
      // Reject the promise with the error message
      reject(new Error(data));
    });

    foo.stdin.on('data', (data: string) => {
      // Handle input data if needed
      vscode.window.showInformationMessage(data);
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    foo.on('exit', (code, signal) => {
      if (code === 0) {
        const data = JSON.parse(bufferOutData);
        resolve(data);
      } else {
        // Reject the promise with an error message
        reject(new Error(`Command execution failed with code ${code}.`));
      }
    });
  });
}
