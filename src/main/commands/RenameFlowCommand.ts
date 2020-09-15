import * as vscode from "vscode";
import { SelectAFlow } from "../libs/SelectAFlow";
import { RenameFlow } from "../libs/RenameFlow";
import { BaseCommand } from "./BaseCommand";
import {SaveFlow} from "../libs/SaveFlow";

export class RenameFlowCommand extends BaseCommand{

  constructor(
  ) {
    super();
  }

  public async execute() {
    const workspacePath = this.getRootPath();
    const selectedFlow = await new SelectAFlow('Select a Flow to rename:', false).execute(workspacePath);
    const renamedFlow = await new SaveFlow(workspacePath).execute(selectedFlow);
  }

}