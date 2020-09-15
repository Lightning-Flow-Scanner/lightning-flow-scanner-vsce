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
        const selectedFlow: Flow  = await new SelectAFlow('Select a Flow to clean:').execute(this.getRootPath());
        const cleanedFlow: Flow  = new CleanFlow().execute(selectedFlow);
        vscode.window.showInformationMessage(`${cleanedFlow.unconnectElements.length} elements and ${cleanedFlow.unusedVariables.length} variables have been removed.`);
        const buildFlow = new BuildNewFlow().execute(cleanedFlow);
        const result: Flow = await new SaveFlow(this.getRootPath()).execute(buildFlow);
        var openPath = vscode.Uri.parse(buildFlow.path);
        if(result && openPath){
            vscode.workspace.openTextDocument(openPath).then(doc => {
                vscode.window.showTextDocument(doc);
            });
        }
    }

}