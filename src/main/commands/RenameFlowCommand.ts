import * as vscode from "vscode";
import { SelectAFlow } from "../libs/SelectAFlow";
import { RenameFlow } from "../libs/RenameFlow";
import { BaseCommand } from "./BaseCommand";

export class RenameFlowCommand extends BaseCommand{

  constructor(
  ) {
    super();
  }

  public async execute() {
    const selectedFlow = await new SelectAFlow('Select a Flow to rename:', false).execute(this.getRootPath());
    const renamedFlow = await new RenameFlow().execute(this.rootPath, selectedFlow);
  }

}