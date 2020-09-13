import { ICommand } from "./interfaces/ICommand";
import * as vscode from "vscode";
import { SelectAFlow } from "../libs/SelectAFlow";
import { RenameFlow } from "../libs/RenameFlow";

export class RenameFlowCommand implements ICommand {

  private rootPath;

  constructor(
  ) {
    this.rootPath = this.getRootPath();
  }

  public async execute() {
    const selectedFlow = await new SelectAFlow('Select a Flow to rename:').execute(this.rootPath);
    const renamedFlow = await new RenameFlow().execute(this.rootPath, selectedFlow);
  }

  public dispose() {}

  private getRootPath() {
    if (!vscode.workspace.getWorkspaceFolder) {
      vscode.window.showErrorMessage("Open a Project Folder first!");
      return undefined;
    } else {
      return vscode.workspace.getWorkspaceFolder;
    }
  }

}