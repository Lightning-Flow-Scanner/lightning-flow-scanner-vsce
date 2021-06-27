import * as vscode from "vscode";

export class BaseCommand {

    public rootPath: vscode.Uri;
    public context: vscode.ExtensionContext;

    constructor(context : vscode.ExtensionContext) {
        if(vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders[0].uri){
            this.rootPath = vscode.workspace.workspaceFolders[0].uri;
        }
        // else {
        //     vscode.window.showInformationMessage("You need to select a workspace first!");
        //     throw new Error('No workspace selected');
        // }
        this.context = context;
    }

}