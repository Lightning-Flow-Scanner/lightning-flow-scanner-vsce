import * as vscode from "vscode";
import { FindFlows } from "./FindFlows";

export class SelectFlows {
  private message: string;

  constructor(rootPath: vscode.Uri, message: string) {
    this.message = message;
  }

  public async execute(initialPath: vscode.Uri) {
    vscode.window.showInformationMessage(this.message);
    const specifyFiles: boolean = vscode.workspace
      .getConfiguration("lightningFlowScanner")
      .get("SpecifyFiles") as boolean;

    const selectedFlows = await vscode.window.showOpenDialog({
      canSelectFiles: specifyFiles,
      canSelectFolders: !specifyFiles,
      canSelectMany: specifyFiles,
      defaultUri: initialPath,
    });

    if(selectedFlows){
      const uris: string[] = [];
      for (const selectedFlow of selectedFlows){
        uris.push(selectedFlow.fsPath);
      }
      if(specifyFiles){
        return uris;
      } else {
        return FindFlows(uris[0]);
      }
    }
    return [];
  }
}
