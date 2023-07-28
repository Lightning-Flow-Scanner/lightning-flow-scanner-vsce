import * as vscode from "vscode";
import {glob} from "glob";

export class SelectFlows {

  private message: string;

  constructor(rootPath: vscode.Uri, message: string) {
    this.message = message;
  }

  public async execute(initialPath: vscode.Uri) {
    vscode.window.showInformationMessage(this.message);
    const specifyFiles : boolean = vscode.workspace.getConfiguration('lightningFlowScanner').get("specifyFiles") as boolean;

    let selectedFlows;
    selectedFlows = await vscode.window.showOpenDialog({
      canSelectFiles: specifyFiles,
      canSelectFolders: !specifyFiles,
      canSelectMany: specifyFiles,
      defaultUri: initialPath,
    });

    if(selectedFlows){
      if(specifyFiles){
        return selectedFlows;
      } else{
        var getDirectories = function (src) {
          return glob.sync(src + '/**/*.{flow-meta.xml,flow}');
        };
        let uris = [];
        const flowsURIsFound = getDirectories(selectedFlows[0].fsPath);
        flowsURIsFound.forEach(flowURI => uris.push(vscode.Uri.file(flowURI)));
        return uris;
      }
    }
  }
}
