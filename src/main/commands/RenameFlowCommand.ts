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
    const renamedFlow: Flow = await new SaveFlow(workspacePath).execute(new RenameFlow().execute(selectedFlow));
  }

}