import * as vscode from "vscode";
import { SelectAFlow } from "../libs/SelectAFlow";
import { RenameFlow } from "../libs/RenameFlow";
import { BaseCommand } from "./BaseCommand";
import { SaveFlow } from "../libs/SaveFlow";
import Flow = require("../models/Flow");
const path = require('path');

export class RenameFlowCommand extends BaseCommand {

  constructor(context : vscode.ExtensionContext
  ) {
    super(context);
  }

  public async execute() {
    const selectedFlow: Flow = await new SelectAFlow(this.rootPath, 'Select a Flow to rename:').execute(this.rootPath);
    const basePath = vscode.Uri.file(path.dirname(selectedFlow.flowUri.path));
    const renamedFlow: Flow = new RenameFlow().execute(selectedFlow);
    const result : String = await new SaveFlow().execute(renamedFlow, basePath);
    if (result && vscode.Uri.parse(renamedFlow.path)) {
      vscode.workspace.openTextDocument(vscode.Uri.parse(renamedFlow.path)).then(doc => {
        vscode.window.showTextDocument(doc);
      });
    }
  }

}