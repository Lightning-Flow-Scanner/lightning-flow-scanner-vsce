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
    const selectedFlow: Flow = await new SelectAFlow('Select a Flow to rename:').execute(this.rootPath);
    const renamedFlow: Flow = new RenameFlow().execute(selectedFlow);
    const result = await new SaveFlow(this.rootPath).execute(renamedFlow);
    if(result && vscode.Uri.parse(renamedFlow.path)){
      vscode.workspace.openTextDocument(vscode.Uri.parse(renamedFlow.path)).then(doc => {
          vscode.window.showTextDocument(doc);
      });
  }
  }

}