import {SelectAFlow} from "../libs/SelectAFlow";
import { BaseCommand } from "./BaseCommand";
import {BuildNewFlow} from "../libs/BuildNewFlow";
import { SaveFlow } from "../libs/SaveFlow";
import {CleanFlow} from "../libs/CleanFlow";
import * as vscode from "vscode";
import Flow = require("../Models/Flow");

export class CleanFlowCommand extends BaseCommand{

    constructor(
    ) {
        super()
    }

    public async execute() {
        const selectedFlow: Flow  = await new SelectAFlow('Select a Flow to clean:').execute(this.rootPath);
        const cleanedFlow: Flow  = new CleanFlow().execute(selectedFlow);
        vscode.window.showInformationMessage(`${cleanedFlow.unconnectElements.length} elements and ${cleanedFlow.unusedVariables.length} variables have been removed.`);
        const buildFlow = new BuildNewFlow().execute(cleanedFlow);
        const result: Boolean = await new SaveFlow().execute(buildFlow, this.rootPath);
        if(result && vscode.Uri.parse(buildFlow.path)){
            vscode.workspace.openTextDocument(vscode.Uri.parse(buildFlow.path)).then(doc => {
                vscode.window.showTextDocument(doc);
            });
        }
    }

}