import {SelectAFlow} from "../libs/SelectAFlow";
import { BaseCommand } from "./BaseCommand";
import {BuildNewFlow} from "../libs/BuildNewFlow";
import { SaveFlow } from "../libs/SaveFlow";
import {CleanFlow} from "../libs/CleanFlow";
import * as vscode from "vscode";

export class CleanFlowCommand extends BaseCommand{

    constructor(
    ) {
        super()
    }

    public async execute() {
        const selectedFlow = await new SelectAFlow('Select a Flow to clean:').execute(this.getRootPath());
        const cleanedFlow = new CleanFlow().execute(selectedFlow);
        vscode.window.showInformationMessage(`${cleanedFlow.unconnectElements.length} elements and ${cleanedFlow.unusedVariables.length} variables have been removed.`);
        const result = await new SaveFlow(this.getRootPath()).execute(new BuildNewFlow().execute(cleanedFlow));
    }

}