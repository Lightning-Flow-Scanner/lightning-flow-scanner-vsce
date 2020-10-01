import * as vscode from "vscode";

export class BaseCommand {

    public rootPath: vscode.Uri;

    constructor() {
        if(vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri){
            this.rootPath = vscode.workspace.workspaceFolders[0].uri;
        } else {
        //    todo add warning

        }
    }

}