import * as vscode from "vscode";
import { SelectAFlow } from "../libs/SelectAFlow";
import { RenameFlow } from "../libs/RenameFlow";
import { BaseCommand } from "./BaseCommand";
import {SaveFlow} from "../libs/SaveFlow";
import Flow = require("../Models/Flow");

export class RenameFlowCommand extends BaseCommand{

  constructor(
  ) {
    super();
  }

  public async execute() {
    const workspacePath = this.getRootPath();
    const selectedFlow: Flow = await new SelectAFlow('Select a Flow to rename:').execute(workspacePath);
    const renamedFlow: Flow = new RenameFlow().execute(selectedFlow);
    const result = await new SaveFlow(this.rootPath).execute(renamedFlow);
    var openPath = vscode.Uri.parse(renamedFlow.path);
    if(result && openPath){
      vscode.workspace.openTextDocument(openPath).then(doc => {
        vscode.window.showTextDocument(doc);
      });
    }
  }

}