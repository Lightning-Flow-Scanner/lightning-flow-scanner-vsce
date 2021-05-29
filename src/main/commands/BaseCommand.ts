import * as vscode from "vscode";

export class BaseCommand {

    public rootPath: vscode.Uri;
    public context: vscode.ExtensionContext;

    constructor(context : vscode.ExtensionContext) {
        if(vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri){
            this.rootPath = vscode.workspace.workspaceFolders[0].uri;
            this.context = context;
        } else {
        //    todo add warning

        }
    }

}