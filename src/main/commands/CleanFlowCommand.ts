import {SelectAFlow} from "../libs/SelectAFlow";
import { BaseCommand } from "./BaseCommand";
import {BuildNewFlow} from "../libs/BuildNewFlow";
import { SaveFlow } from "../libs/SaveFlow";
import {RemoveUnusedElements} from "../libs/RemoveUnusedElements";
import {RemoveUnusedVariables} from "../libs/RemoveUnusedVariables";
import * as vscode from "vscode";
import Flow = require("../models/Flow");
import {Report} from "../panels/Report";
import {FindFlowMetadata} from "../libs/FindFlowMetadata";
const path = require('path');

export class CleanFlowCommand extends BaseCommand{

    constructor(context : vscode.ExtensionContext
    ) {
        super(context)
    }

    public async execute() {
        const selectedFlow: Flow = await new SelectAFlow(this.rootPath, 'Select a Flow to clean:').execute(this.rootPath);
        const basePath = vscode.Uri.file(path.dirname(selectedFlow.flowUri.path));
        const findFlowMetadataResult: Flow = new FindFlowMetadata().execute(selectedFlow);
        const removeUnusedVariablesResult: Flow  = new RemoveUnusedVariables().execute(findFlowMetadataResult);
        const removeUnusedElementsResult: Flow  = new RemoveUnusedElements().execute(removeUnusedVariablesResult);

        const buildFlow = new BuildNewFlow().execute(removeUnusedElementsResult);


        const test1 = '1';
        // // vscode.window.showInformationMessage(`${cleanedFlow.unconnectElements.length} elements and ${cleanedFlow.unusedVariables.length} variables are unused.`);
        //
        //
        Report.createOrShow(this.context.extensionUri, buildFlow);


        // const result = await new SaveFlow().execute(buildFlow, basePath);
        // if(result){
            // vscode.workspace.openTextDocument(vscode.Uri.parse(result)).then(doc => {
            //     vscode.window.showTextDocument(doc);
            // });
        // }
    }

}