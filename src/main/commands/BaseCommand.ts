import * as vscode from "vscode";

export class BaseCommand {

    private getRootPath() {
        if (!vscode.workspace.getWorkspaceFolder) {
            return undefined;
        } else {
            return vscode.workspace.getWorkspaceFolder;
        }
    }

}